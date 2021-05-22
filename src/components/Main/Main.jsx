import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import SectionTitle from '../SectionTitle/SectionTitle';
import Project from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <div className="main">
      <Header loggedIn={false} />
      <main className="main__content">
        <div className="main__theme_style_gray main__space_type_promo main__content_position_center">
          <Promo />
        </div>
        <div className="main__theme_style_snow main__space_type_title-m main__content_position_center">
          <SectionTitle title="О проекте" />
        </div>
        <div className="main__theme_style_snow main__space_type_project main__content_position_center">
          <Project />
        </div>
        <div className="main__theme_style_whitesmoke main__space_type_title-s main__content_position_center">
          <SectionTitle title="Технологии" />
        </div>
        <div className="main__theme_style_whitesmoke main__space_type_techs main__content_position_center">
          <Techs />
        </div>
        <div className="main__theme_style_snow main__space_type_title-m main__content_position_center">
          <SectionTitle title="Студент" />
        </div>
        <div className="main__theme_style_snow main__space_type_about-me main__content_position_center">
          <AboutMe />
        </div>
        <div className="main__theme_style_snow main__space_type_portfolio main__content_position_center">
          <Portfolio />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Main;
