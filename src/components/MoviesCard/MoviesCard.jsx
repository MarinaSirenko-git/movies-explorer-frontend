import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { BASE_URL } from '../../utils/consts';

function MoviesCard({ title, trailer, poster, duration }) {
  const location = useLocation();

  return (
    <li className="cards-list__item">
      <div
        className={`movies-card ${
          location.pathname === '/saved-movies' ? 'movies-card_type_saved' : 'movies-card_type_main'
        }`}
      >
        <button className="movies-card__save-btn movies-card__save-btn_saved" type="button">
          Сохранить
        </button>
        <button
          className="movies-card__delete-btn"
          type="button"
          aria-label="Удалить фильм из избранного"
        />
        <a href={trailer} className="movies-card__link" target="_blank" rel="noopener noreferrer">
          <img
            className="movies-card__img"
            src={`${BASE_URL}${poster}`}
            alt="Постер к фильму «33 слова о дизайне»"
          />
          <div className="movies-card__text">
            <h2 className="movies-card__title">{title}</h2>
            <p className="movies-card__duration">{duration}</p>
          </div>
        </a>
      </div>
    </li>
  );
}

MoviesCard.propTypes = {
  title: PropTypes.string.isRequired,
  trailer: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default MoviesCard;
