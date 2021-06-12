import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { BASE_URL } from '../../utils/consts';
import * as api from '../../utils/MainApi';
import { convertMinutes } from '../../utils/utils';

function MoviesCard({
  _id,
  country,
  director,
  duration,
  year,
  description,
  image,
  trailer,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
  onMovieDelete,
}) {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const card = JSON.parse(localStorage.getItem(`${nameRU}`));
    if (card) {
      setIsSaved(true);
    }
  }, [nameRU]);

  const handleSaveClick = () => {
    if (!isSaved) {
      api
        .createMovie({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailer,
          thumbnail,
          movieId,
          nameRU,
          nameEN,
        })
        .then((res) => {
          if (!res) {
            throw new Error('Не удалось добавить в избранное');
          } else {
            setIsSaved(true);
            localStorage.setItem(`${nameRU}`, JSON.stringify(true));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      localStorage.removeItem(`${nameRU}`);
      onMovieDelete(_id);
    }
  };

  const handleDeleteClick = () => {
    localStorage.removeItem(`${nameRU}`);
    onMovieDelete(_id);
  };

  return (
    <li className="cards-list__item">
      <div
        className={`movies-card ${
          location.pathname === '/saved-movies' ? 'movies-card_type_saved' : 'movies-card_type_main'
        }`}
      >
        <button
          className={`movies-card__save-btn ${isSaved ? 'movies-card__save-btn_saved' : ''}`}
          type="button"
          onClick={handleSaveClick}
        >
          Сохранить
        </button>
        <button
          className="movies-card__delete-btn"
          type="button"
          onClick={handleDeleteClick}
          aria-label="Удалить фильм из избранного"
        />
        <a href={trailer} className="movies-card__link" target="_blank" rel="noopener noreferrer">
          <img
            className="movies-card__img"
            src={`${BASE_URL}${image}`}
            alt="Постер к фильму «33 слова о дизайне»"
          />
          <div className="movies-card__text">
            <h2 className="movies-card__title">{nameRU}</h2>
            <p className="movies-card__duration">{convertMinutes(duration)}</p>
          </div>
        </a>
      </div>
    </li>
  );
}

MoviesCard.propTypes = {
  _id: PropTypes.string.isRequired,
  nameRU: PropTypes.string.isRequired,
  trailer: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
  nameEN: PropTypes.string.isRequired,
  onMovieDelete: PropTypes.func.isRequired,
};

export default MoviesCard;
