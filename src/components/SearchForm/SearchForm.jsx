import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form" name="q-form" role="search">
        <span className="search__icon" />
        <label className="search__label search__label_type_input" htmlFor="search">
          <input
            className="search__input"
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
          <FilterCheckbox />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
