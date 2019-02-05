import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { AuthContext } from '../../App';
import ContestTable from '../../components/Contests/Table';

const GET_CONTESTS = gql`
  {
    contests {
      id
      image
      title
      description
      isPublished
      startDate
      endDate
    }
  }
`;

function Contests(props) {
  return (
    <AuthContext.Consumer>
      {context => (
        <Query query={GET_CONTESTS} pollInterval={2000}>
          {({ loading, error, data }) => {
            if (loading || !data) return null;
            if (error) return error.message;
            return <ContestTable {...props} rows={data.contests} />;
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

export default Contests;
