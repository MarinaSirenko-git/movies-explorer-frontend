import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
          />
        )}
        {loggedIn && (
          <button
            className="navigation__btn navigation__btn_type_close"
            type="button"
            aria-label="Скрыть меню"
            aria-controls="menu"
          />
        )}
        {loggedIn === false && (
          <ul className="navigation__list navigation__list_type_main">
            <li>
              <NavLink
                activeClassName="navigation__link_active"
                className="navigation__link navigation__link_type_signup"
                to="/signup"
              >
                Регистрация
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="navigation__link_active"
                className="navigation__link navigation__link_type_signin"
                to="/signin"
              >
                Войти
              </NavLink>
            </li>
          </ul>
        )}
        {loggedIn && (
          <ul className="navigation__list navigation__list_type_accaunt" id="menu">
            <li>
              <ul className="navigation__left-column">
                <li className="navigation__item navigation__item_type_main">
                  <NavLink
                    exact
                    activeClassName="navigation__link_active"
                    className="navigation__link navigation__link_type_main"
                    to="/"
                  >
                    Главная
                  </NavLink>
                </li>
                <li className="navigation__item navigation__item_type_movies">
                  <NavLink
                    activeClassName="navigation__link_active"
                    className="navigation__link navigation__link_type_movies"
                    to="/movies"
                  >
                    Фильмы
                  </NavLink>
                </li>
                <li className="navigation__item navigation__item_type_save-movies">
                  <NavLink
                    activeClassName="navigation__link_active"
                    className="navigation__link navigation__link_type_save-movies"
                    to="/saved-movies"
                  >
                    Сохранённые фильмы
                  </NavLink>
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
