import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

export default function Authorized({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <AuthContext.Consumer>
          {context =>
            context.logged ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
              />
            )
          }
        </AuthContext.Consumer>
      )}
    />
  );
}
