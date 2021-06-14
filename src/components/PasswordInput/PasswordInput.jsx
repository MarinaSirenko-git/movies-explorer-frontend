import React from 'react';
import PropTypes from 'prop-types';
import './PasswordInput.css';

function PasswordInput({ password, onChangePassword, error, isDisabledInput }) {
  return (
    <div className="form__wrap">
      <label className="form__label" htmlFor="password-input">
        Пароль
        <input
          className={`form__input ${error ? 'form__input_error' : ''}`}
          id="password-input"
          value={password}
          onChange={onChangePassword}
          name="password"
          type="password"
          required
          disabled={isDisabledInput}
        />
      </label>
      {error && <span className="form__error">{error}</span>}
    </div>
  );
}

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isDisabledInput: PropTypes.bool.isRequired,
};

export default PasswordInput;
