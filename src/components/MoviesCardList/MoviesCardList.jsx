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
            trailer={movie.trailerLink}
            image={movie.image.url}
            duration={movie.duration}
            country={movie.country}
            director={movie.director}
            year={movie.year}
            description={movie.description}
            thumbnail={movie.thumbnail}
            movieId={movie.movieId}
            nameRU={movie.nameRU}
            nameEN={movie.nameEN}
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
