import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound-error">404</p>
      <p className="notfound-text">Страница не найдена</p>
      <Link className="notfound-link" to="/">
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
