import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <div className="saved-movies">
      <Header loggedIn />
      <main className="saved-movies__content">
        <SearchForm />
        <p className="saved-movies__alt-text">В избранном ничего нет :(</p>
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
