import React from 'react';
import './SavedMovies.css';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ isEmpty }) {
  return (
    <div className="saved-movies">
      <Header loggedIn />
      <main className="saved-movies__content">
        <SearchForm />
        {isEmpty ? (
          <p className="saved-movies__alt-text">В избранном ничего нет :(</p>
        ) : (
          <MoviesCardList />
        )}
      </main>
      <Footer />
    </div>
  );
}

SavedMovies.propTypes = {
  isEmpty: PropTypes.bool.isRequired,
};

export default SavedMovies;
