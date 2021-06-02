import React from 'react';
import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  return (
    <section className="cards-list">
      <ul className="cards-list__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie._id}
            title={movie.nameRU}
            trailer={movie.trailerLink}
            poster={movie.image.url}
            duration={movie.duration}
          />
        ))}
      </ul>
    </section>
  );
}

MoviesCardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default MoviesCardList;
