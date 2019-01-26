/* eslint-disable react/prop-types */
import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AuthContext } from '../../App';

export const ROLE = 'ROLE';
export const AUTH_TOKEN = '__AUTH__TOKEN__';

const SIGNUP_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
      user {
        role
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        role
      }
    }
  }
`;

function authMutation(props, mutation) {
  return (
    <AuthContext.Consumer>
      {context => (
        <Mutation
          mutation={mutation}
          onCompleted={authenticate(context)}
          onError={err => {
            props.onError(
              err.graphQLErrors &&
                err.graphQLErrors[0] &&
                err.graphQLErrors[0].message,
            );
          }}
        >
          {submit => props.children(submit)}
        </Mutation>
      )}
    </AuthContext.Consumer>
  );
}

export function LoginMutation(props) {
  return authMutation(props, LOGIN_MUTATION);
}

export function RegisterMutation(props) {
  return authMutation(props, SIGNUP_MUTATION);
}

const authenticated = 'isAuthenticated';
export function isAuthenticated() {
  try {
    return JSON.parse(localStorage.getItem(authenticated));
  } catch (error) {
    return false;
  }
}

function authenticate(context) {
  return ({ login, createUser }) => {
    const source = login || createUser;
    const { token, user } = source;
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
      localStorage.setItem(ROLE, user.role);
      localStorage.setItem(authenticated, true);
      context.setRole(user.role);
      context.signin();
    }
  };
}

export function signout() {
  localStorage.setItem(authenticated, false);
  localStorage.setItem(AUTH_TOKEN, null);
}

export default {
  signout,
  isAuthenticated,
};
