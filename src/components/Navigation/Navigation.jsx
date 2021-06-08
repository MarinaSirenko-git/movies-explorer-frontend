import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';
import PropTypes from 'prop-types';

function Navigation({ loggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="navigation">
      <nav className="navigation__menu">
        {loggedIn && (
          <button
            className="navigation__btn navigation__btn_type_open"
            type="button"
            aria-label="Показать меню"
            aria-controls="menu"
            onClick={handleOpenMenu}
          />
        )}
        {loggedIn && (
          <button
            className={`navigation__btn navigation__btn_type_close ${
              isOpen ? 'navigation__btn_status_open' : ''
            }`}
            type="button"
            aria-label="Скрыть меню"
            aria-controls="menu"
            onClick={handleCloseMenu}
          />
        )}
        {loggedIn === false && (
          <ul
            className={`navigation__list navigation__list_type_main ${
              isOpen ? 'navigation__list_status_open' : ''
            }`}
          >
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
        {loggedIn === true && (
          <ul
            className={`navigation__list navigation__list_type_accaunt ${
              isOpen ? 'navigation__list_status_open' : ''
            }`}
            id="menu"
          >
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
