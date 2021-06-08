import React from 'react';
import PropTypes from 'prop-types';
import './NameInput.css';
import useValidate from '../../hooks/useValidate';

function NameInput({ name, onChangeName }) {
  const { inputValue, onChange, error } = useValidate(name);
  onChangeName(inputValue);

  return (
    <div className="form__wrap">
      <label className="form__label" htmlFor="name">
        Имя
        <input
          className={`form__input ${error ? 'form__input_error' : ''}`}
          value={inputValue}
          onChange={onChange}
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
};

export default NameInput;
