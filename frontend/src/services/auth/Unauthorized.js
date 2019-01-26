import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';

function withUnauthorized(Component) {
  class Unauthorized extends React.Component {
    state = { redirectToReferrer: false };

    setRedirect = () => {
      this.setState({ redirectToReferrer: true });
    };

    render() {
      const { location } = this.props;
      const { from } = location.state || {
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
  }

  Unauthorized.propTypes = {
    location: PropTypes.object.isRequired,
  };

  return Unauthorized;
}

export default withUnauthorized;
