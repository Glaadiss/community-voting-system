import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { signout } from '../../services/auth/State';
import { AuthContext } from '../../App';

const GET_CONTESTS = gql`
  {
    contests {
      id
      name
    }
  }
`;

function Contests() {
  return (
    <AuthContext.Consumer>
      {context => (
        <Query query={GET_CONTESTS} pollInterval={2000}>
          {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return null;
            if (error) {
              if (
                error.graphQLErrors &&
                error.graphQLErrors.some(el => el.name === 'UNAUTHORIZED')
              ) {
                signout();
                context.signout();
              }
              console.log(error);
            }

            return data.contests.map(el => (
              <p key={el.ld}>
                <strong>el.name</strong>
              </p>
            ));
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

export default Contests;