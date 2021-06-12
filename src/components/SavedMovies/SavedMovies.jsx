import React, { useEffect, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import AltText from '../AltText/AltText';
import { NOSAVE_TEXT, SERVER_ERR_TEXT, NORESULT_TEXT } from '../../utils/consts';

import * as api from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import savedMoviesReducer from '../../state/savedMoviesReducer';
import { filterMovies } from '../../utils/utils';

function SavedMovies({ loggedIn }) {
  const userContext = useContext(CurrentUserContext);
  const [data, dispatch] = useReducer(savedMoviesReducer, {
    isMessage: null,
    isBeatFilm: false,
    movies: [],
  });

  useEffect(() => {
    api
      .getMovies()
      .then((movies) => {
        if (!movies) {
          throw new Error(SERVER_ERR_TEXT);
        } else if (movies.length === 0) {
          dispatch({
            type: 'noFaundResult',
            isMessage: NOSAVE_TEXT,
            movies,
          });
        } else {
          const userMovies = movies.filter((item) => item.owner === userContext._id);
          dispatch({
            type: 'fetch',
            isMessage: null,
            movies: userMovies,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: 'serverError',
          isMessage: SERVER_ERR_TEXT,
          movies: [],
        });
      });
  }, [userContext._id]);

  const handleMovieDelete = (_id) => {
    api
      .deleteMovie(_id)
      .then(() => {
        const movies = data.movies.filter((item) => item._id !== _id);
        dispatch({
          type: 'fetch',
          isMessage: null,
          movies,
        });
      })
      .catch((e) => console.log(e));
  };

  const handleSortMovies = (value, isChecked) => {
    const sortedMovies = filterMovies(data.movies, value, isChecked);
    if (sortedMovies.length === 0) {
      dispatch({
        type: 'noFaundResult',
        isMessage: NORESULT_TEXT,
        movies: sortedMovies,
      });
    } else {
      dispatch({
        type: 'fetch',
        isMessage: null,
        movies: sortedMovies,
      });
    }
  };

  return (
    <div className="saved-movies">
      <Header loggedIn={loggedIn} />
      <main className="saved-movies__content">
        <SearchForm onGetMovies={handleSortMovies} />
        {data.isMessage && <AltText title={data.isMessage} />}
        {data.movies && (
          <MoviesCardList
            movies={data.movies}
            isBeatFilm={data.isBeatFilm}
            onMovieDelete={handleMovieDelete}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

SavedMovies.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default SavedMovies;
