import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import StartPage from '../StartPage/StartPage';
import Form from '../Form/Form';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import useValidate from '../../hooks/useValidate';

function Login({ onLogin, queryError, setQueryError }) {
  useEffect(() => {
    setQueryError('');
  }, []);

  const loginData = {
    email: '',
    password: '',
  };

  const { data, handleChange, emailError, passwordError, isValid, resetForm } = useValidate(
    loginData
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(data);
    resetForm();
  };

  return (
    <StartPage>
      <Form onSubmit={handleSubmit} isValid={isValid} queryError={queryError}>
        <EmailInput email={data.email} onChangeEmail={handleChange} error={emailError} />
        <PasswordInput
          password={data.password}
          onChangePassword={handleChange}
          error={passwordError}
        />
      </Form>
    </StartPage>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  queryError: PropTypes.string.isRequired,
  setQueryError: PropTypes.func.isRequired,
};

export default Login;
