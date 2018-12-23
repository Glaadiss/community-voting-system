import React from 'react';
import PropTypes from 'prop-types';
import AuthForm from '../../components/AuthForm';

function Login(props) {
  const { login } = props;
  return (
    <AuthForm
      onSubmit={login}
      title="Logowanie"
      firstAction="Zaloguj się!"
      secondAction="Nie posiadasz konta? Zarejestruj się!"
      secondActionLink="/register"
    />
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
