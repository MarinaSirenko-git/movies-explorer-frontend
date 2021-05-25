import React from 'react';
import PropTypes from 'prop-types';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ isLoading }) {
  return (
    <div className="movies">
      <Header loggedIn />
      <main className="movies__content">
        <SearchForm />
        {isLoading ? <Preloader /> : <MoviesCardList />}
      </main>
      <Footer />
    </div>
  );
}

Movies.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Movies;
