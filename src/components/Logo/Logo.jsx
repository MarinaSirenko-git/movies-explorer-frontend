import React from 'react';
import logo from '../../images/logo.svg';
import './Logo.css';

function Logo() {
  return <img className="header__logo" src={logo} alt="Логотип приложения BeatFilm" />;
}

export default Logo;
