import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import StartPage from '../StartPage/StartPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/signup">
          <StartPage isRegister />
        </Route>
        <Route path="/signin">
          <StartPage isRegister={false} />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <InfoTooltip />
    </div>
  );
}

export default App;
