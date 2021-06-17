import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import AltText from '../AltText/AltText';
import MoviesButton from '../MoviesButton/MoviesButton';
import { filterMovies, countUploadedMovies } from '../../utils/utils';
import { DEFAULT_TEXT, NORESULT_TEXT } from '../../utils/consts';
import moviesReducer from '../../state/moviesReducer';
import * as api from '../../utils/MainApi';

function Movies({ loggedIn, beatFilmMovies }) {
  const [data, dispatch] = useReducer(moviesReducer, {
    isMessage: DEFAULT_TEXT,
    isLoading: false,
    isButton: false,
    isBeatFilm: true,
    defaultMovies: [],
    movies: [],
    sliceMovies: [],
    count: 0,
  });

  const [userMovies, setUserMovies] = useState([]);

  useEffect(() => {
    api
      .getMovies()
      .then((res) => {
        setUserMovies(res);
      })
      .catch((e) => console.log(e));
  }, [data.sliceMovies]);

  useEffect(() => {
    dispatch({ type: 'fetch', defaultMovies: beatFilmMovies });
  }, [beatFilmMovies]);

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
    const sortedMovies = filterMovies(data.defaultMovies, value, isChecked);
    if (sortedMovies.length === 0) {
      localStorage.removeItem('movies');
      dispatch({
        type: 'noFaundResult',
        isLoading: false,
        isMessage: NORESULT_TEXT,
        sliceMovies: sortedMovies,
      });
    } else {
      localStorage.setItem('movies', JSON.stringify(sortedMovies));
      dispatch({
        type: 'filter',
        isMessage: null,
        isLoading: false,
        movies: sortedMovies,
        sliceMovies: sortedMovies,
        isButton: sortedMovies,
        count: data.count,
      });
    }
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

  const handleMovieDeleteFromMovies = (movieId, nameRU, setIsSaved) => {
    const userMoviesId = userMovies
      .filter((item) => item.movieId === movieId)
      .map((element) => element._id);
    const _id = userMoviesId[0];
    api
      .deleteMovie(_id)
      .then(() => {
        const movies = data.movies.filter((item) => item._id !== _id);
        dispatch({
          type: 'filter',
          isMessage: null,
          movies,
          sliceMovies: movies,
          isButton: movies,
          count: data.count,
        });
        setIsSaved(false);
        localStorage.removeItem(`${nameRU}`);
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
              onMovieDeleteFromMovies={handleMovieDeleteFromMovies}
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
  beatFilmMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Movies;
