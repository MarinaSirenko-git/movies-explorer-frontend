import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import { BASE_URL } from '../../utils/consts';
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
  onMovieDeleteFromMovies,
  onMovieCreate,
}) {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const card = JSON.parse(localStorage.getItem(`${nameRU}`));
    if (card) {
      setIsSaved(true);
    }
  }, [nameRU]);

  const handleDeleteClick = () => {
    onMovieDelete(_id, nameRU);
  };

  const handleClick = () => {
    if (!isSaved) {
      onMovieCreate(
        {
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
        },
        setIsSaved
      );
    } else {
      onMovieDeleteFromMovies(movieId, nameRU, setIsSaved);
    }
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
          onClick={handleClick}
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
  country: PropTypes.string,
  director: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
  nameEN: PropTypes.string,
  onMovieDelete: PropTypes.func.isRequired,
  onMovieCreate: PropTypes.func.isRequired,
  onMovieDeleteFromMovies: PropTypes.func.isRequired,
};

MoviesCard.defaultProps = {
  country: 'Страна не указана',
  nameEN: 'No Name',
};

export default MoviesCard;
