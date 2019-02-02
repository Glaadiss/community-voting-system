import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Button } from '@material-ui/core';
import { AuthContext } from '../../App';
import Info from '../../components/Projects/Info';
import PdfViewer from './PdfViewer';

const GET_PROJECT = id => gql`
{
  project(id: "${id}") {
      id
      title
      image
      description
      isPublished
  }
}
`;

const VOTE = gql`
  mutation Mutation($contestId: ID!, $projectId: ID!) {
    vote(data: { contestId: $contestId, projectId: $projectId }) {
      id
    }
  }
`;

const REMOVE_VOTE = gql`
  mutation Mutation($contestId: ID!, $projectId: ID!) {
    removeVote(data: { contestId: $contestId, projectId: $projectId })
  }
`;

const CHECK_VOTE = id => gql`
     {
        projectWhichUserVotesInContest(id: "${id}")
    }
`;

function ShowProject(props) {
  const {
    match: {
      params: { id, projectId },
    },
  } = props;

  return (
    <AuthContext.Consumer>
      {context => (
        <Query query={GET_PROJECT(projectId)} pollInterval={20000}>
          {({ loading, error, data }) => {
            if (loading || !data) return null;
            if (error) return error.message;
            const { project } = data;
            return (
              <Info
                {...project}
                Button={<VoteButton id={id} projectId={projectId} />}
                Doc={<PdfViewer url={getPdfUrl(projectId)} />}
              />
            );
          }}
        </Query>
      )}
    </AuthContext.Consumer>
  );
}

function VoteButton(props) {
  const { id, projectId } = props;
  function handleSubmit(onSubmit) {
    return () => {
      onSubmit({
        variables: {
          contestId: id,
          projectId,
        },
      });
    };
  }
  return (
    <Query query={CHECK_VOTE(id)} pollInterval={20000}>
      {({ loading, error, data }) => {
        if (loading || !data) return null;
        if (error) return error.message;
        const { projectWhichUserVotesInContest } = data;
        if (projectWhichUserVotesInContest === projectId) {
          return (
            <Mutation mutation={REMOVE_VOTE}>
              {submit => (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit(submit)}
                >
                  Remove Vote
                </Button>
              )}
            </Mutation>
          );
        }
        return (
          <Mutation mutation={VOTE}>
            {submit => (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(submit)}
              >
                Vote
              </Button>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}

ShowProject.propTypes = {
  match: PropTypes.object.isRequired,
};

VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default ShowProject;

function getPdfUrl(projectId) {
  return `http://localhost:4000/pdfs/${projectId}.pdf`;
}
