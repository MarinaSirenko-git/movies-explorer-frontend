import React from 'react';
import PropTypes from 'prop-types';
import './PasswordInput.css';
import useValidate from '../../hooks/useValidate';

function PasswordInput({ password, onChangePassword }) {
  const { inputValue, onChange, error } = useValidate(password);
  onChangePassword(inputValue);

  return (
    <div className="form__wrap">
      <label className="form__label" htmlFor="password">
        Пароль
        <input
          className={`form__input ${error ? 'form__input_error' : ''}`}
          value={inputValue}
          onChange={onChange}
          name="password"
          type="password"
          required
        />
      </label>
      {error && <span className="form__error">{error}</span>}
    </div>
  );
}

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,
};

export default PasswordInput;
