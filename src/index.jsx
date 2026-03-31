import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import process from 'process';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

if (typeof window !== 'undefined' && !window.process) {
  window.process = process;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
