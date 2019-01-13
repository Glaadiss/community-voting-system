import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { RegisterMutation } from '../../services/auth/State';

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
