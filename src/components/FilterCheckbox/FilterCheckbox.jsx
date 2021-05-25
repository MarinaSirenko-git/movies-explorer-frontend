import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="filter-checkbox" htmlFor="short-film">
      <input className="filter-checkbox__input" type="checkbox" name="short-film" />
      Короткометражки
      <span className="filter-checkbox__pseudo-input" />
    </label>
  );
}

export default FilterCheckbox;
