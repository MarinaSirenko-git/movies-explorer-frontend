import React from 'react';
import PropTypes from 'prop-types';
import './NameInput.css';

function NameInput({ name, onChangeName }) {
  const handleChange = (e) => {
    onChangeName(e.target.value);
  };

  return (
    <label className="form__label" htmlFor="name">
      Имя
      <input
        className="form__input"
        value={name}
        onChange={handleChange}
        name="name"
        type="name"
        required
      />
    </label>
  );
}

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeName: PropTypes.func.isRequired,
};

export default NameInput;
