import React from 'react';
import './MoviesCard.css';
import Poster from '../../images/test-poster.jpg';

function MoviesCard() {
  return (
    <div className="movies-card">
      <div className="movies-card__poster">
        <button className="movies-card__save-btn" type="button">
          Сохранить
        </button>
        <span className="movies-card__icon" />
        <img className="movies-card__img" src={Poster} alt="Постер к фильму «33 слова о дизайне»" />
      </div>
      <div className="movies-card__text">
        <h2 className="movies-card__title">33 слова о дизайне</h2>
        <p className="movies-card__duration">1ч 17м</p>
      </div>
    </div>
  );
}

export default MoviesCard;
