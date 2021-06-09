import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import StartPage from '../StartPage/StartPage';
import Form from '../Form/Form';
import NameInput from '../NameInput/NameInput';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';
import useValidate from '../../hooks/useValidate';

function Register({ onRegister, queryError, setQueryError }) {
  useEffect(() => {
    setQueryError('');
  }, []);

  const registerData = {
    name: '',
    email: '',
    password: '',
  };

  const {
    data,
    handleChange,
    nameError,
    emailError,
    passwordError,
    isValid,
    resetForm,
  } = useValidate(registerData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(data);
    resetForm();
  };

  return (
    <StartPage>
      <Form onSubmit={handleSubmit} isValid={isValid} queryError={queryError}>
        <NameInput name={data.name} onChangeName={handleChange} error={nameError} />
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

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
  queryError: PropTypes.string.isRequired,
  setQueryError: PropTypes.func.isRequired,
};

export default Register;
