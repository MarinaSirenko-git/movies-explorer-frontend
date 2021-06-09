import React from 'react';
import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isBeatFilm }) {
  return (
    <section className="cards-list">
      <ul className="cards-list__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie._id}
            trailer={movie.trailerLink}
            image={isBeatFilm ? movie.image.url : movie.image}
            duration={movie.duration}
            country={movie.country}
            director={movie.director}
            year={movie.year}
            description={movie.description}
            thumbnail={isBeatFilm ? movie.image.formats.thumbnail.url : movies.thumbnail}
            movieId={movie.id}
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
  isBeatFilm: PropTypes.bool.isRequired,
};

export default MoviesCardList;
