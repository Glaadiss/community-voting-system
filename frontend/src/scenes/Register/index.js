import React from 'react';
import PropTypes from 'prop-types';
import AuthForm from '../../components/AuthForm';

function Register(props) {
  const { register } = props;
  return (
    <AuthForm
      onSubmit={register}
      title="Rejestracja"
      firstAction="Zajerestruj się!"
      secondAction="Posiadasz konto? Zaloguj się!"
      secondActionLink="/login"
    />
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
};

export default Register;
