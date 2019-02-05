import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { AuthContext } from '../../App';
import ProjectTable from '../../components/Projects/Table';

const GET_PROJECTS = id => gql`
  {
    contest(id: "${id}"){
        id
        projects {
            id
            title
            image
            description
            isPublished
            votes {
                id
            }
        }
    }
  }
`;

function ContestProjects(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  return (
    <AuthContext.Consumer>
      {context => (
        <Query query={GET_PROJECTS(id)} pollInterval={2000}>
          {({ loading, error, data }) => {
            if (loading || !data) return null;
            if (error) return error.message;

            return <ProjectTable {...props} rows={data.contest.projects} />;
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

ContestProjects.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ContestProjects;
