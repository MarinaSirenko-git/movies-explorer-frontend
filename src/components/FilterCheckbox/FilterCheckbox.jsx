import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="filter-checkbox" htmlFor="short-film">
      <input
        className="filter-checkbox__input filter-checkbox__input_type_hidden"
        type="checkbox"
        name="short-film"
      />
      <span className="filter-checkbox__pseudo-input filter-checkbox__pseudo-input_type_visible" />
      <p className="filter-checkbox__text">Короткометражки</p>
    </label>
  );
}

export default FilterCheckbox;
