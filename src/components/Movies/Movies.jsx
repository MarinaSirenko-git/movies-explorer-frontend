import React, { useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import getMovies from '../../utils/MoviesApi';
import AltText from '../AltText/AltText';
import { DEFAULT_TEXT, SERVER_ERR_TEXT, NORESULT_TEXT } from '../../utils/consts';

function Movies() {
  const [isShow, setIsShow] = useState(true);
  const [isMessage, setIsMessage] = useState(DEFAULT_TEXT);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleGetMovies = (value) => {
    setIsShow(false);
    setIsLoading(true);
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
          setMovies([]);
          setIsShow(true);
          setIsMessage(NORESULT_TEXT);
        } else {
          setMovies(moviesArr);
        }
      })
      .catch(() => {
        setMovies([]);
        setIsShow(true);
        setIsMessage(SERVER_ERR_TEXT);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="movies">
      <Header loggedIn />
      <main className="movies__content">
        <SearchForm onGetMovies={handleGetMovies} />
        {isShow ? <AltText title={isMessage} /> : ''}
        {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
