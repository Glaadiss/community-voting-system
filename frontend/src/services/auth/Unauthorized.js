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
      let { from } = this.props.location.state || {
        from: { pathname: '/app' },
      };
      let { redirectToReferrer } = this.state;
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
