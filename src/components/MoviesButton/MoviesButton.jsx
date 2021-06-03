import React from 'react';
import PropTypes from 'prop-types';
import './MoviesButton.css';

function MoviesButton({ onChangeMovies }) {
  const handleClick = () => {
    onChangeMovies([]);
  };

  return (
    <button className="movies-btn" type="button" onClick={handleClick}>
      Ещё
    </button>
  );
}

MoviesButton.propTypes = {
  onChangeMovies: PropTypes.func.isRequired,
};

export default MoviesButton;
