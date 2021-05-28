import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound__error">404</p>
      <p className="notfound__text">Страница не найдена</p>
      <Link className="notfound__link" to="/">
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
