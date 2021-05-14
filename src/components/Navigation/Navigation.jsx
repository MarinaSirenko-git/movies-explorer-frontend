import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <ul className="header__nav">
      <li>
        <Link className="header__link header__link_type_signup" to="/signup">
          Регистрация
        </Link>
      </li>
      <li>
        <Link className="header__link header__link_type_signin" to="/signin">
          Войти
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
