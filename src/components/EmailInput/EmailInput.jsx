import React from 'react';
import PropTypes from 'prop-types';
import './EmailInput.css';
import useValidate from '../../hooks/useValidate';

function EmailInput({ email, onChangeEmail }) {
  const { inputValue, onChange, error } = useValidate(email);
  onChangeEmail(inputValue);

  return (
    <div className="form__wrap">
      <label className="form__label" htmlFor="email">
        E-mail
        <input
          className={`form__input ${error ? 'form__input_error' : ''}`}
          value={inputValue}
          onChange={onChange}
          name="email"
          type="email"
          required
        />
      </label>
      {error && <span className="form__error">{error}</span>}
    </div>
  );
}

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
};

export default EmailInput;
