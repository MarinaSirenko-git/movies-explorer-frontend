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
  }, [setQueryError]);

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
    setIsValid,
    isDisabledInput,
    setIsDisabledInput,
    resetForm,
  } = useValidate(registerData);

  useEffect(() => {
    setQueryError('');
  }, [emailError, setQueryError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(data, resetForm, setIsValid, setIsDisabledInput);
    setIsValid(false);
    setIsDisabledInput(true);
  };

  return (
    <StartPage>
      <Form onSubmit={handleSubmit} isValid={isValid} queryError={queryError}>
        <NameInput
          name={data.name}
          onChangeName={handleChange}
          error={nameError}
          isDisabledInput={isDisabledInput}
        />
        <EmailInput
          email={data.email}
          onChangeEmail={handleChange}
          error={emailError}
          isDisabledInput={isDisabledInput}
        />
        <PasswordInput
          password={data.password}
          onChangePassword={handleChange}
          error={passwordError}
          isDisabledInput={isDisabledInput}
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
