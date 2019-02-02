import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { AuthContext } from '../../App';
import ProjectTable from '../../components/Projects/Table';

export const GET_PROJECTS = gql`
  {
    projects {
      id
      title
      image
      description
      isPublished
    }
  }
`;

function Projects(props) {
  return (
    <AuthContext.Consumer>
      {context => (
        <Query query={GET_PROJECTS} pollInterval={1000}>
          {({ loading, error, data }) => {
            if (loading || !data) return null;
            if (error) return error.message;
            return <ProjectTable {...props} rows={data.projects} />;
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

export default Projects;
