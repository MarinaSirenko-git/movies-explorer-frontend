import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/MarinaSirenko-git/where-to-go"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="portfolio__link-text">Статичный сайт</span>
            <span className="portfolio__link-text">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/MarinaSirenko-git/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="portfolio__link-text">Адаптивный сайт</span>
            <span className="portfolio__link-text">↗</span>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/MarinaSirenko-git/mesto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="portfolio__link-text">Одностраничное приложение</span>
            <span className="portfolio__link-text">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
