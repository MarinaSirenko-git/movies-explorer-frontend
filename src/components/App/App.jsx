import React, { useState } from 'react';
import './App.css';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegister = ({ name, email, password }) => {
    api
      .register(name, email, password)
      .then((res) => {
        if (!res) {
          throw new Error('Ошибка при регистрации');
        } else {
          setLoggedIn(true);
          history.push('/movies');
          setCurrentUser({});
        }
      })
      .catch((e) => console.log(e));
  };

  const handleLogin = ({ email, password }) => {
    api.authorize(email, password).then((res) => {
      if (!res) {
        throw new Error('Ошибка при авторизации');
      } else {
        setLoggedIn(true);
        history.push('/movies');
      }
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/" exact loggedIn={loggedIn} component={Main} />
          <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} />
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} />
          <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile} />
          <ProtectedRoute path="*" loggedIn={loggedIn} component={NotFound} />
          <Route path="/">{loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}</Route>
        </Switch>
        <InfoTooltip />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
