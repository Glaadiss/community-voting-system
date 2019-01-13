import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { AuthContext } from '../../App';
import ProjectTable from '../../components/Projects/Table';

const GET_PROJECTS = gql`
  {
    projects {
      id
      title
      description
      isPublished
    }
  }
`;

function Projects() {
  return (
    <AuthContext.Consumer>
      {context => (
        <Query query={GET_PROJECTS} pollInterval={2000}>
          {({ loading, error, data }) => {
            if (loading || !data) return null;
            if (error) return error.message;
            return <ProjectTable rows={data.projects} />;
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

export default Projects;
