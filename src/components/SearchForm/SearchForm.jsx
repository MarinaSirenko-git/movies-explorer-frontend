import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form" name="q-form" role="search">
        <span className="search__icon" />
        <label className="search__label search__label_type_input" htmlFor="q">
          <input
            className="search__input"
            type="search"
            name="q"
            aria-label="Поле поиска по каталогу фильмов"
            placeholder="Фильм"
          />
        </label>
        <label className="search__label search__label_type_btn" htmlFor="button">
          <input className="search__btn" type="button" area-role="Найти" name="button" />
        </label>
        <div className="search__checkbox">
          <FilterCheckbox />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
