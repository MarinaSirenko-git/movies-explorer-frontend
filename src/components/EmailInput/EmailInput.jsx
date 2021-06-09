import React from 'react';
import PropTypes from 'prop-types';
import './EmailInput.css';

function EmailInput({ email, onChangeEmail, error }) {
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
};

export default EmailInput;
