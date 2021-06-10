import React from 'react';
import PropTypes from 'prop-types';
import './FilterCheckbox.css';

function FilterCheckbox({ changeMovieList }) {
  return (
    <label className="filter-checkbox" htmlFor="checkbox">
      <input
        className="filter-checkbox__input"
        onClick={changeMovieList}
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
  changeMovieList: PropTypes.func.isRequired,
};

export default FilterCheckbox;
