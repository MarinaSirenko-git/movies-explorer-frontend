import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onGetMovies, changeMovieList }) {
  const [key, setKey] = useState('');

  const handleChangeKey = (e) => {
    setKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGetMovies(key);
  };

  return (
    <div className="search">
      <form className="search__form" name="q-form" role="search" onSubmit={handleSubmit}>
        <span className="search__icon" />
        <label className="search__label search__label_type_input" htmlFor="search">
          <input
            className="search__input"
            value={key}
            onChange={handleChangeKey}
            type="search"
            name="q"
            aria-label="Поле поиска по каталогу фильмов"
            placeholder="Фильм"
            id="search"
            required
          />
        </label>
        <button className="search__btn" aria-label="Найти" type="submit" />
        <div className="search__checkbox">
          <FilterCheckbox changeMovieList={changeMovieList} />
        </div>
      </form>
    </div>
  );
}

SearchForm.propTypes = {
  onGetMovies: PropTypes.func.isRequired,
  changeMovieList: PropTypes.func.isRequired,
};

export default SearchForm;
