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
    <main>
      <div className="main__theme_style_gray main__space_type_header main__content_position_center">
        <Header />
      </div>
      <div className="main__theme_style_gray main__space_type_promo main__content_position_center">
        <Promo />
      </div>
      <div className="main__theme_style_snow main__space_type_title-m main__content_position_center">
        <SectionTitle />
      </div>
      <div className="main__theme_style_snow main__space_type_project main__content_position_center">
        <Project />
      </div>
      <div className="main__theme_style_whitesmoke main__space_type_title-s main__content_position_center">
        <SectionTitle />
      </div>
      <div className="main__theme_style_whitesmoke main__space_type_techs main__content_position_center">
        <Techs />
      </div>
      <div className="main__theme_style_snow main__space_type_title-m main__content_position_center">
        <SectionTitle />
      </div>
      <div className="main__theme_style_snow main__space_type_about-me main__content_position_center">
        <AboutMe />
      </div>
      <div className="main__theme_style_snow main__space_type_portfolio main__content_position_center">
        <Portfolio />
      </div>
      <div className="main__theme_style_lightsmoke main__space_type_footer main__content_position_center">
        <Footer />
      </div>
    </main>
  );
}

export default Main;
