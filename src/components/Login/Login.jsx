import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StartPage from '../StartPage/StartPage';
import Form from '../Form/Form';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (data) => {
    setEmail(data);
  };

  const handleChangePassword = (data) => {
    setPassword(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email,
      password,
    });
  };

  return (
    <StartPage>
      <Form onSubmit={handleSubmit}>
        <EmailInput email={email} onChangeEmail={handleChangeEmail} />
        <PasswordInput password={password} onChangePassword={handleChangePassword} />
      </Form>
    </StartPage>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
