import React from 'react';
import PropTypes from 'prop-types';
import './StartPage.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';

function StartPage({ isRegister }) {
  const location = useLocation();
  return (
    <main className="start-page">
      <div className="start-page__content">
        <Logo />
        <h1 className="start-page__title">{isRegister ? 'Добро пожаловать!' : 'Рады видеть!'}</h1>
        <Form isRegister={isRegister} />
        {location.pathname === '/signin' && (
          <p className="start-page__text">
            Ещё не зарегистрированы?
            <Link className="start-page__link" to="/signup">
              Регистрация
            </Link>
          </p>
        )}
        {location.pathname === '/signup' && (
          <p className="start-page__text">
            Уже зарегистрированы?
            <Link className="start-page__link" to="/signin">
              Войти
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}

StartPage.propTypes = {
  isRegister: PropTypes.bool.isRequired,
};

export default StartPage;
