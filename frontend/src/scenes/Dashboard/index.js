import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import GridList from './GridList';

export const GET_BEST_PROJECTS = gql`
  {
    projects {
      id
      title
      votes {
        id
      }
    }
  }
`;

export const GET_ACTIVE_CONTESTS = gql`
  {
    contests {
      id
      title
      votes {
        id
      }
    }
  }
`;

export const GET_LAST_CONTESTS = gql`
  {
    contests(orderBy: startDate_DESC, first: 3) {
      id
      title
      startDate
    }
  }
`;

function takeBestThree(rows) {
  return [...rows].sort((a, b) => (a.votes > b.votes ? -1 : 1)).slice(0, 3);
}

function Dashboard(props) {
  const { activeContests, bestProjects, lastContests } = props;
  console.log(activeContests, bestProjects, lastContests);
  if (!activeContests || !bestProjects || !lastContests) {
    return 'Loading...';
  }

  return (
    <GridList
      {...props}
      activeContests={takeBestThree(activeContests)}
      bestProjects={takeBestThree(bestProjects)}
    />
  );
}

Dashboard.propTypes = {
  bestProjects: PropTypes.array.isRequired,
  activeContests: PropTypes.array.isRequired,
  lastContests: PropTypes.array.isRequired,
};

export default compose(
  graphql(GET_ACTIVE_CONTESTS, {
    props: ({ data }) => ({ ...data, activeContests: data.contests }),
  }),
  graphql(GET_LAST_CONTESTS, {
    props: ({ data }) => ({ ...data, lastContests: data.contests }),
  }),
  graphql(GET_BEST_PROJECTS, {
    props: ({ data }) => ({ ...data, bestProjects: data.projects }),
  }),
)(Dashboard);
