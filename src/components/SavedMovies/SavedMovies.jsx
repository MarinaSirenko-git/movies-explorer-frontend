import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import AltText from '../AltText/AltText';
import { NOSAVE_TEXT } from '../../utils/consts';
import * as api from '../../utils/MainApi';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [isText, setIsText] = useState(true);

  useEffect(() => {
    api
      .getMovies()
      .then((res) => {
        if (!res) {
          throw new Error('Ошибка сервера');
        } else if (res.length === 0) {
          throw new Error('Список сохраненных фильмов пуст');
        } else {
          setIsText(false);
          setSavedMovies(res);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="saved-movies">
      <Header loggedIn />
      <main className="saved-movies__content">
        <SearchForm />
        {isText ? <AltText title={NOSAVE_TEXT} /> : null}
        <MoviesCardList movies={savedMovies} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
