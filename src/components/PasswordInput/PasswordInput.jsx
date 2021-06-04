import React from 'react';
import PropTypes from 'prop-types';
import './PasswordInput.css';

function PasswordInput({ password, onChangePassword }) {
  const handleChange = (e) => {
    onChangePassword(e.target.value);
  };

  return (
    <label className="form__label" htmlFor="password">
      Пароль
      <input
        className="form__input"
        value={password}
        onChange={handleChange}
        name="password"
        type="password"
        required
      />
    </label>
  );
}

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
};

export default PasswordInput;
