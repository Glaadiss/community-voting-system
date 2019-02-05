import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AuthContext } from '../../App';
import ContestScore from '../../components/ContestScore';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '70%',
  },
});

const GET_CONTESTS = gql`
  {
    contests {
      id
      image
      title
      projects {
        id
        title
        votes {
          id
        }
      }
      votes {
        id
      }
    }
  }
`;

function Scores({ classes }) {
  return (
    <AuthContext.Consumer>
      {context => (
        <Query query={GET_CONTESTS} pollInterval={2000}>
          {({ loading, error, data }) => {
            if (loading || !data) return null;
            if (error) return error.message;
            const contests = data.contests.filter(
              el => el.projects.length > 0 && el.votes.length > 0,
            );
            console.log(contests);
            return (
              <div className={classes.root}>
                <GridList
                  cellHeight={450}
                  className={classes.gridList}
                  cols={4}
                  spacing={20}
                >
                  {contests.map(el => [
                    <GridListTile
                      key="lastContests"
                      cols={1}
                      style={{ textAlign: 'center', lineHeight: '350px' }}
                    >
                      <h2>{el.title}</h2>
                    </GridListTile>,
                    <GridListTile cols={3} style={{ textAlign: 'center' }}>
                      <ContestScore {...el} />
                    </GridListTile>,
                  ])}
                </GridList>
              </div>
            );
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

Scores.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Scores);
