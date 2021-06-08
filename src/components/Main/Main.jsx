import React from 'react';
import PropTypes from 'prop-types';
import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import SectionTitle from '../SectionTitle/SectionTitle';
import Project from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main({ loggedIn }) {
  console.log(loggedIn);
  return (
    <div className="main">
      <div className="main__section_style_gray">
        <Header loggedIn={loggedIn} />
      </div>
      <main className="main__content">
        <div className="main__section main__section_promo main__section_style_gray">
          <Promo />
        </div>
        <div className="main__section main__section_style_snow title-m">
          <SectionTitle title="О проекте" />
        </div>
        <div className="main__section main__section_style_snow">
          <Project />
        </div>
        <div className="main__section main__section_style_whitesmoke title-s">
          <SectionTitle title="Технологии" />
        </div>
        <div className="main__section main__section_style_whitesmoke">
          <Techs />
        </div>
        <div className="main__section main__section_style_snow title-m">
          <SectionTitle title="Студент" />
        </div>
        <div className="main__section main__section_style_snow">
          <AboutMe />
        </div>
        <div className="main__section main__section_style_snow">
          <Portfolio />
        </div>
      </main>
      <Footer />
    </div>
  );
}

Main.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Main;
