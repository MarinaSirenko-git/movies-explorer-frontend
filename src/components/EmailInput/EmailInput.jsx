import React from 'react';
import PropTypes from 'prop-types';
import './EmailInput.css';

function EmailInput({ email, onChangeEmail, error, isDisabledInput }) {
  return (
    <div className="form__wrap">
      <label className="form__label" htmlFor="email-input">
        E-mail
        <input
          className={`form__input ${error ? 'form__input_error' : ''}`}
          id="email-input"
          value={email}
          onChange={onChangeEmail}
          name="email"
          type="email"
          required
          disabled={isDisabledInput}
        />
      </label>
      {error && <span className="form__error">{error}</span>}
    </div>
  );
}

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  isDisabledInput: PropTypes.bool.isRequired,
};

export default EmailInput;
