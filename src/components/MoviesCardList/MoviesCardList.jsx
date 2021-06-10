import React from 'react';
import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, isBeatFilm, onMovieDelete }) {
  return (
    <section className="cards-list">
      <ul className="cards-list__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie._id}
            _id={movie._id}
            country={movie.country}
            director={movie.director}
            duration={movie.duration}
            year={movie.year}
            description={movie.description}
            image={isBeatFilm ? movie.image.url : movie.image}
            trailer={movie.trailerLink}
            thumbnail={isBeatFilm ? movie.image.formats.thumbnail.url : movie.thumbnail}
            movieId={isBeatFilm ? movie.id : movie.movieId}
            nameRU={movie.nameRU}
            nameEN={movie.nameEN}
            onMovieDelete={onMovieDelete}
          />
        ))}
      </ul>
    </section>
  );
}

MoviesCardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isBeatFilm: PropTypes.bool.isRequired,
  onMovieDelete: PropTypes.func.isRequired,
};

export default MoviesCardList;
