import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <section className="cards-list">
      <ul className="cards-list__list">
        <li className="cards-list__item">
          <MoviesCard />
        </li>
        <li className="cards-list__item">
          <MoviesCard />
        </li>
        <li className="cards-list__item">
          <MoviesCard />
        </li>
        <li className="cards-list__item">
          <MoviesCard />
        </li>
      </ul>
      <button className="cards-list__btn" type="button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
