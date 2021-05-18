import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import SectionTitle from '../SectionTitle/SectionTitle';
import Project from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="app">
      <div className="app__theme_style_gray app__space_type_header app__content_position_center">
        <Header />
      </div>
      <div className="app__theme_style_gray app__space_type_promo app__content_position_center">
        <Promo />
      </div>
      <div className="app__theme_style_snow app__space_type_title-m app__content_position_center">
        <SectionTitle />
      </div>
      <div className="app__theme_style_snow app__space_type_project app__content_position_center">
        <Project />
      </div>
      <div className="app__theme_style_whitesmoke app__space_type_title-s app__content_position_center">
        <SectionTitle />
      </div>
      <div className="app__theme_style_whitesmoke app__space_type_techs app__content_position_center">
        <Techs />
      </div>
      <div className="app__theme_style_snow app__space_type_title-m app__content_position_center">
        <SectionTitle />
      </div>
      <div className="app__theme_style_snow app__space_type_about-me app__content_position_center">
        <AboutMe />
      </div>
      <div className="app__theme_style_snow app__space_type_portfolio app__content_position_center">
        <Portfolio />
      </div>
      <div className="app__theme_style_lightsmoke app__space_type_footer app__content_position_center">
        <Footer />
      </div>
    </div>
  );
}

export default App;
