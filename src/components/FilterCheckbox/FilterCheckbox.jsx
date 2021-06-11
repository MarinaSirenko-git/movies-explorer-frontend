import React from 'react';
import PropTypes from 'prop-types';
import './FilterCheckbox.css';

function FilterCheckbox({ onChange }) {
  return (
    <label className="filter-checkbox" htmlFor="checkbox">
      <input
        className="filter-checkbox__input"
        defaultChecked={false}
        onChange={onChange}
        type="checkbox"
        name="short-film"
        id="checkbox"
      />
      Короткометражки
      <span className="filter-checkbox__pseudo-input" />
    </label>
  );
}

FilterCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FilterCheckbox;
