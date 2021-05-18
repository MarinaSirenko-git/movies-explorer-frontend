import React from 'react';
import './AboutMe.css';
import Photo from '../../images/me@x1.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__desc">
        <h3 className="about-me__title">Марина</h3>
        <p className="about-me__subtitle">Фронтенд-разработчик, 31 год</p>
        <p className="about-me__text">
          Я&nbsp;родилась и&nbsp;живу в&nbsp;Ростове-на-Дону, закончила факультет экономики РИНХ.
          У&nbsp;меня есть муж и&nbsp;сын. Я&nbsp;люблю слушать музыку, а&nbsp;ещё читать, кино,
          зарядку по&nbsp;утрам, люблю куда-нибудь&nbsp;съездить, да&nbsp;и&nbsp;вообще люблю быть
          при деле. Начинала с&nbsp;верстки. Сейчас прохожу курс по&nbsp;веб-разработке, и&nbsp;это
          мой дипломный проект.
        </p>
      </div>
      <img className="about-me__img" src={Photo} alt="Я на фото" />
      <ul className="about-me__list">
        <li>
          <a
            className="about-me__link"
            href="https://www.linkedin.com/in/sirenko-marina/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            className="about-me__link"
            href="https://github.com/MarinaSirenko-git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
