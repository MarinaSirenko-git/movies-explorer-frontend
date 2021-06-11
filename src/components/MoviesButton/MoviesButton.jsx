import React from 'react';
import PropTypes from 'prop-types';
import './MoviesButton.css';

function MoviesButton({ changeNumberMovies }) {
  return (
    <button className="movies-btn" type="button" onClick={changeNumberMovies}>
      Ещё
    </button>
  );
}

MoviesButton.propTypes = {
  changeNumberMovies: PropTypes.func.isRequired,
};

export default MoviesButton;
