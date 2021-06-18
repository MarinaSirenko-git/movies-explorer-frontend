import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { REQUIRED_TEXT } from '../../utils/consts';

function SearchForm({ onGetMovies }) {
  const [key, setKey] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error === '') {
      setIsRequired(false);
    }
  }, [error, key]);

  const handleChangeKey = (e) => {
    setError('');
    setKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key === '') {
      setIsRequired(true);
      setError(REQUIRED_TEXT);
    } else {
      setIsChecked(e.target.checked);
      onGetMovies(key, isChecked);
    }
  };

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
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
          />
        </label>
        <button className="search__btn" aria-label="Найти" type="submit" />
        <div className="search__checkbox">
          <FilterCheckbox onChange={handleChange} />
        </div>
      </form>
      {error && isRequired && <span className="search__error">{error}</span>}
    </div>
  );
}

SearchForm.propTypes = {
  onGetMovies: PropTypes.func.isRequired,
};

export default SearchForm;
