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
import {
  DEFAULT_TEXT,
  SERVER_ERR_TEXT,
  NORESULT_TEXT,
  MCL_4K,
  MCL_TABLET,
} from '../../utils/consts';

function filterMovies(arr, value, isChecked) {
  console.log(isChecked);
  const regex = new RegExp(value, 'i');
  const lengthFilm = arr.filter((item) => {
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
  if (isChecked === true) {
    return lengthFilm.filter((item) => item.duration <= 40);
  }
  return lengthFilm;
}

function countUploadedMovies() {
  if (MCL_4K.matches) {
    return 3;
  }
  if (MCL_TABLET.matches) {
    return 2;
  }
  return 2;
}

function getSliceMovies(movie, n) {
  if (MCL_4K.matches) {
    return movie.slice(0, 12 + n);
  }
  if (MCL_TABLET.matches) {
    return movie.slice(0, 8 + n);
  }
  return movie.slice(0, 5 + n);
}

function reducer(state, action) {
  switch (action.type) {
    case 'checkLocalStorage':
    case 'fetch': {
      const { isMessage, isShow, movies, count } = action;
      return {
        ...state,
        isMessage,
        isShow,
        movies,
        sliceMovies: getSliceMovies(movies, count),
        isButton: movies.length > getSliceMovies(movies, count).length,
      };
    }
    case 'beforeFetch': {
      const { isShow, isLoading, isButton } = action;
      return {
        ...state,
        isShow,
        isLoading,
        isButton,
      };
    }
    case 'noFaundResult':
    case 'serverError': {
      const { isMessage, isShow, isRender } = action;
      return {
        ...state,
        isMessage,
        isShow,
        isRender,
      };
    }
    case 'increment': {
      const { movies, count } = action;
      return {
        ...state,
        movies,
        sliceMovies: getSliceMovies(movies, count),
        isButton: movies.length > getSliceMovies(movies, count).length,
        count,
      };
    }
    case 'finally': {
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
      };
    }
    default: {
      const { movies } = action;
      return {
        ...state,
        movies,
      };
    }
  }
}

function Movies({ loggedIn }) {
  const [data, dispatch] = useReducer(reducer, {
    isShow: true,
    isMessage: DEFAULT_TEXT,
    isLoading: false,
    isButton: false,
    isBeatFilm: true,
    isRender: true,
    movies: [],
    sliceMovies: [],
    count: 0,
  });

  useEffect(() => {
    const searchMovies = JSON.parse(localStorage.getItem('movies'));
    if (searchMovies) {
      dispatch({
        type: 'checkLocalStorage',
        isMessage: '',
        isShow: false,
        movies: searchMovies,
        sliceMovies: searchMovies,
        isButton: searchMovies,
        count: data.count,
      });
    } else {
      dispatch({});
    }
  }, []);

  const handleGetMovies = (value, isChecked) => {
    dispatch({ type: 'beforeFetch', isShow: false, isLoading: true, isButton: false });
    getMovies()
      .then((res) => {
        const sortedMovies = filterMovies(res, value, isChecked);
        if (sortedMovies.length === 0) {
          localStorage.removeItem('movies');
          dispatch({
            type: 'noFaundResult',
            isMessage: NORESULT_TEXT,
            isShow: true,
            isRender: true,
          });
        } else {
          localStorage.setItem('movies', JSON.stringify(sortedMovies));
          dispatch({
            type: 'fetch',
            isMessage: '',
            isShow: false,
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
          isShow: true,
          isRender: true,
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

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <main className="movies__content">
        <SearchForm onGetMovies={handleGetMovies} />
        {data.isShow && <AltText title={data.isMessage} />}
        {data.isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList movies={data.sliceMovies} isBeatFilm={data.isBeatFilm} />
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
