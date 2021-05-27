import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="filter-checkbox" htmlFor="checkbox">
      <input className="filter-checkbox__input" type="checkbox" name="short-film" id="checkbox" />
      Короткометражки
      <span className="filter-checkbox__pseudo-input" />
    </label>
  );
}

export default FilterCheckbox;
