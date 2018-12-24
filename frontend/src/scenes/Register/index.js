import React from 'react';
import AuthForm from '../../components/AuthForm';
import { RegisterMutation } from '../../services/auth/State';
import { withRouter } from 'react-router-dom';
function Register() {
  return (
    <AuthForm
      title="Rejestracja"
      firstAction="Zajerestruj się!"
      secondAction="Posiadasz konto? Zaloguj się!"
      secondActionLink="/login"
      Mutation={withRouter(RegisterMutation)}
    />
  );
}

export default Register;
