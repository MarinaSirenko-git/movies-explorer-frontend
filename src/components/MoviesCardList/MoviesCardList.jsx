import React from 'react';
import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  movies,
  isBeatFilm,
  onMovieDelete,
  onMovieDeleteFromMovies,
  onMovieCreate,
}) {
  return (
    <section className="cards-list">
      <ul className="cards-list__list">
        {movies.map((movie) => (
          <MoviesCard
            key={isBeatFilm ? movie.id : movie.movieId}
            _id={isBeatFilm ? '' : movie._id}
            country={movie.country}
            director={movie.director}
            duration={movie.duration}
            year={movie.year}
            description={movie.description}
            image={isBeatFilm ? movie.image.url : movie.image}
            trailer={isBeatFilm ? movie.trailerLink : movie.trailer}
            thumbnail={isBeatFilm ? movie.image.formats.thumbnail.url : movie.thumbnail}
            movieId={isBeatFilm ? movie.id : movie.movieId}
            nameRU={movie.nameRU}
            nameEN={movie.nameEN}
            onMovieDelete={onMovieDelete}
            onMovieCreate={onMovieCreate}
            onMovieDeleteFromMovies={onMovieDeleteFromMovies}
          />
        ))}
      </ul>
    </section>
  );
}

MoviesCardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  isBeatFilm: PropTypes.bool.isRequired,
  onMovieDelete: PropTypes.func.isRequired,
  onMovieDeleteFromMovies: PropTypes.func.isRequired,
  onMovieCreate: PropTypes.func.isRequired,
};

export default MoviesCardList;
