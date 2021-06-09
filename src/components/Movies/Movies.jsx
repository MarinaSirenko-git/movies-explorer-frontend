import React, { useEffect, useReducer, useState } from 'react';
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
import {
  DEFAULT_TEXT,
  SERVER_ERR_TEXT,
  NORESULT_TEXT,
  MCL_4K,
  MCL_TABLET,
} from '../../utils/consts';

function init(state) {
  return { ...state };
}

function reducer(state, action) {
  switch (action.type) {
    case 'checkLocalStorage':
      return {
        ...state,
        isMessage: action.text,
        movies: action.payload,
        isButton: action.isButton,
      };
    case 'beforeFetch':
      return {
        ...state,
        isShow: action.isShow,
        isLoading: action.isLoading,
        isButton: action.isButton,
      };
    case 'noFaundResult':
      return {
        ...state,
        movies: action.payload,
        isShow: action.isShow,
        isMessage: action.text,
      };
    case 'fetch':
      return {
        ...state,
        movies: action.payload,
        isButton: action.isButton,
      };
    case 'error':
      return {
        ...state,
        movies: action.payload,
        isShow: action.isShow,
        isMessage: action.text,
        isButton: action.isButton,
      };
    case 'finally':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}

function Movies({ loggedIn }) {
  const [isBeatFilm, setIsBitFilm] = useState(false);
  const [data, dispatch] = useReducer(
    reducer,
    {
      isShow: true,
      isMessage: DEFAULT_TEXT,
      isLoading: false,
      isButton: false,
      movies: [],
    },
    init
  );

  useEffect(() => {
    const searchMovies = localStorage.getItem('movies');
    if (searchMovies) {
      setIsBitFilm(true);
      dispatch({
        type: 'checkLocalStorage',
        text: null,
        payload: JSON.parse(searchMovies),
        isButton: true,
      });
    } else {
      dispatch({});
    }
  }, []);

  const handleGetMovies = (value) => {
    dispatch({ type: 'beforeFetch', isShow: false, isLoading: true, isButton: false });
    getMovies()
      .then((res) => {
        const regex = new RegExp(value, 'i');
        const moviesArr = res.filter((item) => {
          if (
            (regex.test(item.nameRU) && item.image.url !== null) ||
            (regex.test(item.director) && item.image.url !== null) ||
            (regex.test(item.year) && item.image.url !== null) ||
            (regex.test(item.country) && item.image.url !== null)
          ) {
            return item;
          }
          return null;
        });
        if (moviesArr.length === 0) {
          dispatch({
            type: 'noFaundResult',
            payload: [],
            isShow: true,
            text: NORESULT_TEXT,
          });
          localStorage.removeItem('movies');
        } else {
          localStorage.setItem('movies', JSON.stringify(moviesArr));
          setIsBitFilm(true);
          if (MCL_4K.matches) {
            dispatch({ type: 'fetch', payload: moviesArr.slice(0, 12), isButton: true });
          } else if (MCL_TABLET.matches) {
            dispatch({ type: 'fetch', payload: moviesArr.slice(0, 8), isButton: true });
          } else {
            dispatch({ type: 'fetch', payload: moviesArr.slice(0, 5), isButton: true });
          }
        }
      })
      .catch(() => {
        dispatch({
          type: 'error',
          payload: [],
          isShow: true,
          text: SERVER_ERR_TEXT,
          isButton: false,
        });
        localStorage.removeItem('movies');
      })
      .finally(() => dispatch({ type: 'finally', isLoading: false }));
  };

  const handleChangeMovies = () => {
    dispatch({ type: 'fetch', payload: [], isButton: false });
  };

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <main className="movies__content">
        <SearchForm onGetMovies={handleGetMovies} />
        {data.isShow ? <AltText title={data.isMessage} /> : null}
        {data.isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList movies={data.movies} isBeatFilm={isBeatFilm} />
        )}
        {data.isButton ? <MoviesButton onChangeMovies={handleChangeMovies} /> : null}
      </main>
      <Footer />
    </div>
  );
}

Movies.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Movies;
