/* eslint-disable react/prop-types */
import React from 'react';
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

export default Header;
