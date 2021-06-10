import React, { useEffect, useState, useContext } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import AltText from '../AltText/AltText';
import { NOSAVE_TEXT } from '../../utils/consts';
import * as api from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SavedMovies() {
  const userContext = useContext(CurrentUserContext);
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
          const movies = res.filter((item) => item.owner === userContext._id);
          setIsText(false);
          setSavedMovies(movies);
        }
      })
      .catch((e) => console.log(e));
  }, [userContext._id]);

  const handleMovieDelete = (_id) => {
    api
      .deleteMovie(_id)
      .then(() => {
        const movies = savedMovies.filter((item) => item._id !== _id);
        setSavedMovies(movies);
      })
      .catch((e) => console.log(e));
  };

  const handleGetMovies = (value) => {
    console.log(value);
  };

  return (
    <div className="saved-movies">
      <Header loggedIn />
      <main className="saved-movies__content">
        <SearchForm onGetMovies={handleGetMovies} />
        {isText ? <AltText title={NOSAVE_TEXT} /> : null}
        <MoviesCardList movies={savedMovies} isBeatFilm={false} onMovieDelete={handleMovieDelete} />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
