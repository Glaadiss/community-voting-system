import React from 'react';
import { Redirect } from 'react-router-dom';
import auth from './State';

export default function withUnauthorized(Component) {
  return class Unauthorized extends React.Component {
    state = { redirectToReferrer: false };

    setRedirect = () => {
      this.setState({ redirectToReferrer: true });
    };

    login = () => {
      auth.authenticate(this.setRedirect);
    };

    register = () => {
      auth.register(this.setRedirect);
    };

    render() {
      let { from } = this.props.location.state || {
        from: { pathname: '/app' },
      };
      let { redirectToReferrer } = this.state;

      if (redirectToReferrer || auth.isAuthenticated())
        return <Redirect to={from} />;

      return <Component login={this.login} register={this.register} />;
    }
  };
}
