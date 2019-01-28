import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { AuthContext } from '../../App';
import ContestScore from '../../components/ContestScore';

const GET_CONTESTS = gql`
  {
    contests {
      id
      image
      title
      projects {
        id
        title
      }
      votes {
        contest {
          id
        }
      }
    }
  }
`;

function Scores() {
  return (
    <AuthContext.Consumer>
      {context => (
        <Query query={GET_CONTESTS} pollInterval={2000}>
          {({ loading, error, data }) => {
            if (loading || !data) return null;
            if (error) return error.message;

            return data.contests.map(el => (
              <div key={el.id}>
                <ContestScore {...el} />
              </div>
            ));
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

export default Scores;
