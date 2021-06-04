import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StartPage from '../StartPage/StartPage';
import Form from '../Form/Form';
import NameInput from '../NameInput/NameInput';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = (data) => {
    setName(data);
  };

  const handleChangeEmail = (data) => {
    setEmail(data);
  };

  const handleChangePassword = (data) => {
    setPassword(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name,
      email,
      password,
    });
  };

  return (
    <StartPage>
      <Form onSubmit={handleSubmit}>
        <NameInput name={name} onChangeName={handleChangeName} />
        <EmailInput email={email} onChangeEmail={handleChangeEmail} />
        <PasswordInput password={password} onChangePassword={handleChangePassword} />
      </Form>
    </StartPage>
  );
}

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default Register;
