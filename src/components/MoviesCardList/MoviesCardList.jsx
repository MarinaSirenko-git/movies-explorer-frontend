import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  const [isButton, setIsButton] = useState(true);
  const [filterMovies, setFilterMovies] = useState([]);

  useEffect(() => {
    setFilterMovies(movies);
    setIsButton(true);
  }, [movies]);

  return (
    <section className="cards-list">
      <ul className="cards-list__list">
        {filterMovies.map((movie) => (
          <MoviesCard
            key={movie._id}
            title={movie.nameRU}
            trailer={movie.trailerLink}
            poster={movie.image.url}
            duration={movie.duration}
          />
        ))}
      </ul>
      {isButton ? null : (
        <button className="cards-list__btn" type="button">
          Ещё
        </button>
      )}
    </section>
  );
}

MoviesCardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default MoviesCardList;
