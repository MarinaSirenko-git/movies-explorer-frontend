import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ loggedIn }) {
  return (
    <header className="header">
      <Logo />
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Header;
