import React from 'react';
import PropTypes from 'prop-types';
import './NameInput.css';

function NameInput({ name, onChangeName, error }) {
  return (
    <div className="form__wrap">
      <label className="form__label" htmlFor="name-input">
        Имя
        <input
          className={`form__input ${error ? 'form__input_error' : ''}`}
          id="name-input"
          value={name}
          onChange={onChangeName}
          name="name"
          type="name"
          required
        />
      </label>
      {error && <span className="form__error">{error}</span>}
    </div>
  );
}

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default NameInput;
