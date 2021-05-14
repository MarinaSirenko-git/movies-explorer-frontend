import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="app">
      <div className="app__header app__section">
        <Header />
      </div>
      <div className="app__footer app__section">
        <Footer />
      </div>
    </div>
  );
}

export default App;
