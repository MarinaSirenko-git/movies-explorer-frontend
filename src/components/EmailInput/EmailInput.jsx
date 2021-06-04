import React from 'react';
import PropTypes from 'prop-types';
import './EmailInput.css';

function EmailInput({ email, onChangeEmail }) {
  const handleChange = (e) => {
    onChangeEmail(e.target.value);
  };

  return (
    <label className="form__label" htmlFor="email">
      E-mail
      <input
        className="form__input"
        value={email}
        onChange={handleChange}
        name="email"
        type="email"
        required
      />
    </label>
  );
}

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
};

export default EmailInput;
