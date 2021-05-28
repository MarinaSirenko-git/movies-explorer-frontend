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
          Родилась ещё южнее, а&nbsp;сейчас живу в&nbsp;Ростове-на-Дону. Закончила факультет
          экономики РИНХ. У&nbsp;меня есть муж и&nbsp;сын. Люблю и музыку, и книги, и кино,
          интересные места — в&nbsp;целом без какой-либо экзотики (разве что остеопатические
          упражнения по&nbsp;утрам 🙂). Можно сказать, люблю быть при деле. На&nbsp;последнем месте
          работы отвечала за&nbsp;вёрстку. Сейчас прохожу курс по&nbsp;веб-разработке, и&nbsp;это
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
