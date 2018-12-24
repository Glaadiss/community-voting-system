import React from 'react';
import AuthForm from '../../components/AuthForm';
import { LoginMutation } from '../../services/auth/State';
import { withRouter } from 'react-router-dom';

function Login() {
  return (
    <AuthForm
      title="Logowanie"
      firstAction="Zaloguj się!"
      secondAction="Nie posiadasz konta? Zarejestruj się!"
      secondActionLink="/register"
      Mutation={withRouter(LoginMutation)}
    />
  );
}
export default Login;
