import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { AuthContext } from '../../App';
import UsersTable from '../../components/Users/Table';

const GET_USERS = gql`
  {
    users {
      id
      email
      role
      name
      pesel
      postalCode
    }
  }
`;

function Users() {
  return (
    <AuthContext.Consumer>
      {context => (
        <Query query={GET_USERS} pollInterval={2000}>
          {({ loading, error, data }) => {
            if (loading || !data) return null;
            if (error) return error.message;
            return <UsersTable rows={data.users} />;
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

export default Users;
