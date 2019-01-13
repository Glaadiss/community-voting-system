import React from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

export default function withUnauthorized(Component) {
  return class Unauthorized extends React.Component {
    state = { redirectToReferrer: false };

    setRedirect = () => {
      this.setState({ redirectToReferrer: true });
    };

    render() {
      const { from } = this.props.location.state || {
        from: { pathname: '/app' },
      };
      const { redirectToReferrer } = this.state;
      return (
        <AuthContext.Consumer>
          {context =>
            redirectToReferrer || context.logged ? (
              <Redirect to={from} />
            ) : (
              <Component />
            )
          }
        </AuthContext.Consumer>
      );
    }
  };
}
