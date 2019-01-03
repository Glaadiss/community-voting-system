import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { AuthContext } from '../../App';
import ContestTable from '../../components/Contests/Table';

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
          {({ loading, error, data }) => {
            if (loading) return null;
            return <ContestTable rows={data.contests} />;
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

export default Contests;
