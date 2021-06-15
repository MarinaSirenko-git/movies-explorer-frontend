import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import getMovies from '../../utils/MoviesApi';
import AltText from '../AltText/AltText';
import MoviesButton from '../MoviesButton/MoviesButton';
import { filterMovies, countUploadedMovies } from '../../utils/utils';
import { DEFAULT_TEXT, SERVER_ERR_TEXT, NORESULT_TEXT } from '../../utils/consts';
import moviesReducer from '../../state/moviesReducer';
import * as api from '../../utils/MainApi';

function Movies({ loggedIn }) {
  const [data, dispatch] = useReducer(moviesReducer, {
    isMessage: DEFAULT_TEXT,
    isLoading: false,
    isButton: false,
    isBeatFilm: true,
    movies: [],
    sliceMovies: [],
    count: 0,
  });

  useEffect(() => {
    const searchMovies = JSON.parse(localStorage.getItem('movies'));
    if (searchMovies) {
      dispatch({
        type: 'checkLocalStorage',
        isMessage: null,
        movies: searchMovies,
        sliceMovies: searchMovies,
        isButton: searchMovies,
        count: data.count,
      });
    } else {
      dispatch({});
    }
  }, [data.count]);

  const handleGetMovies = (value, isChecked) => {
    dispatch({ type: 'beforeFetch', isLoading: true, isButton: false, isMessage: null });
    getMovies()
      .then((res) => {
        const sortedMovies = filterMovies(res, value, isChecked);
        if (sortedMovies.length === 0) {
          localStorage.removeItem('movies');
          dispatch({
            type: 'noFaundResult',
            isMessage: NORESULT_TEXT,
            sliceMovies: sortedMovies,
          });
        } else {
          localStorage.setItem('movies', JSON.stringify(sortedMovies));
          dispatch({
            type: 'fetch',
            isMessage: null,
            movies: sortedMovies,
            sliceMovies: sortedMovies,
            isButton: sortedMovies,
            count: data.count,
          });
        }
      })
      .catch(() => {
        localStorage.removeItem('movies');
        dispatch({
          type: 'serverError',
          isMessage: SERVER_ERR_TEXT,
          sliceMovies: [],
        });
      })
      .finally(() => dispatch({ type: 'finally', isLoading: false }));
  };

  const handleChangeMovies = () => {
    dispatch({
      type: 'increment',
      movies: data.movies,
      sliceMovies: data.movies,
      isButton: data.movies,
      count: data.count + countUploadedMovies(),
    });
  };

  const handleMovieDelete = (_id) => {
    api
      .deleteMovie(_id)
      .then(() => {
        const movies = data.movies.filter((item) => item._id !== _id);
        dispatch({
          type: 'fetch',
          isMessage: null,
          movies,
          sliceMovies: movies,
          isButton: movies,
          count: data.count,
        });
      })
      .catch((e) => console.log(e));
  };

  const handleMovieCreate = (movieFields, setIsSaved) => {
    api
      .createMovie(movieFields)
      .then((res) => {
        if (!res) {
          throw new Error('Не удалось добавить в избранное');
        } else {
          setIsSaved(true);
          localStorage.setItem(`${movieFields.nameRU}`, JSON.stringify(true));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <main className="movies__content">
        <SearchForm onGetMovies={handleGetMovies} />
        {data.isMessage && <AltText title={data.isMessage} />}
        {data.isLoading ? (
          <Preloader />
        ) : (
          data.sliceMovies && (
            <MoviesCardList
              movies={data.sliceMovies}
              isBeatFilm={data.isBeatFilm}
              onMovieDelete={handleMovieDelete}
              onMovieCreate={handleMovieCreate}
            />
          )
        )}
        {data.isButton ? <MoviesButton changeNumberMovies={handleChangeMovies} /> : null}
      </main>
      <Footer />
    </div>
  );
}

Movies.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Movies;
