import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import Poster from '../../images/test-poster.jpg';

function MoviesCard() {
  const location = useLocation();
  return (
    <div
      className={`movies-card ${
        location.pathname === '/saved-movies' ? 'movies-card_type_saved' : 'movies-card_type_main'
      }`}
    >
      <button className="movies-card__save-btn" type="button">
        Сохранить
      </button>
      <button
        className="movies-card__delete-btn"
        type="button"
        aria-label="Удалить фильм из избранного"
      />
      <a
        href="https://www.youtube.com/watch?v=1s5hVmVNPts"
        className="movies-card__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="movies-card__img" src={Poster} alt="Постер к фильму «33 слова о дизайне»" />
        <div className="movies-card__text">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <p className="movies-card__duration">1ч 17м</p>
        </div>
      </a>
    </div>
  );
}

export default MoviesCard;
