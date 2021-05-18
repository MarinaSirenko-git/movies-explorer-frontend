import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__up-part">
        <p className="footer__project-name">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
      </div>
      <div className="footer__down-part">
        <p className="footer__copyright">&copy;&nbsp;2020</p>
        <ul className="footer__nav">
          <li>
            <a
              className="footer__link"
              href="https://praktikum.yandex.ru/web"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://github.com/MarinaSirenko-git"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              className="footer__link"
              href="https://www.linkedin.com/in/sirenko-marina/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
