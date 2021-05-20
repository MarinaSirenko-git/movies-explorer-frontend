import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <main className="movies">
      <section className="movies__content">
        <Header />
        <SearchForm />
        <MoviesCardList />
        <Footer />
      </section>
    </main>
  );
}

export default Movies;
