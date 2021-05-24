import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import PropTypes from 'prop-types';

function Navigation({ loggedIn }) {
  return (
    <div className="navigation">
      <nav className="navigation__menu">
        {loggedIn && (
          <button
            className="navigation__btn navigation__btn_type_open"
            type="button"
            aria-label="Показать меню"
            aria-controls="menu"
            aria-hidden="true"
          />
        )}
        {loggedIn && (
          <button
            className="navigation__btn navigation__btn_type_close"
            type="button"
            aria-label="Скрыть меню"
            aria-controls="menu"
            aria-hidden="true"
          />
        )}
        {loggedIn === false && (
          <ul className="navigation__list navigation__list_type_main">
            <li>
              <Link className="navigation__link navigation__link_type_signup" to="/signup">
                Регистрация
              </Link>
            </li>
            <li>
              <Link className="navigation__link navigation__link_type_signin" to="/signin">
                Войти
              </Link>
            </li>
          </ul>
        )}
        {loggedIn && (
          <ul className="navigation__list navigation__list_type_accaunt" id="menu">
            <li>
              <ul className="navigation__left-column">
                <li className="navigation__item">
                  <Link className="navigation__link navigation__link_type_main" to="/">
                    Главная
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link className="navigation__link navigation__link_type_movies" to="/movies">
                    Фильмы
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link
                    className="navigation__link navigation__link_type_save-movies"
                    to="/saved-movies"
                  >
                    Сохранённые фильмы
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="navigation__link navigation__link_type_profile" to="/profile">
                Аккаунт
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Navigation;
