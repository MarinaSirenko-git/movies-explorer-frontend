import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as api from '../../utils/MainApi';
import { NOREGISTER_TEXT, NOAUTHORIZE_TEXT, SACCESS_PROFILE_TEXT } from '../../utils/consts';
import getMovies from '../../utils/MoviesApi';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [queryMessage, setQueryMessage] = useState('');
  const [beatFilmMovies, setBeatFilmMovies] = useState([]);

  const tokenCheck = useCallback(() => {
    api
      .getUser()
      .then((res) => {
        if (res.message) {
          throw new Error(res.message);
        } else {
          setLoggedIn(true);
          setQueryMessage('');
          setCurrentUser(res);
          if (location.pathname === '/signin' || location.pathname === '/signup') {
            history.push('/movies');
          } else {
            history.push(location.pathname);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        history.push('/signin');
      });
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck, history]);

  useEffect(() => {
    getMovies()
      .then((res) => {
        setBeatFilmMovies(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleRegister = ({ name, email, password }, resetForm, setIsValid, setIsDisabledInput) => {
    api
      .register(name, email, password)
      .then((res) => {
        if (!res) {
          setIsValid(true);
          setIsDisabledInput(false);
          setQueryMessage(NOREGISTER_TEXT);
          throw new Error(NOREGISTER_TEXT);
        } else if (res.message) {
          setIsValid(true);
          setIsDisabledInput(false);
          setQueryMessage(res.message);
          throw new Error(res.message);
        } else {
          resetForm();
          setLoggedIn(true);
          setCurrentUser(res);
          history.push('/signin');
        }
      })
      .catch((e) => console.log(e));
  };

  const handleLogin = ({ email, password }, resetForm, setIsValid, setIsDisabledInput) => {
    api
      .authorize(email, password)
      .then((res) => {
        if (!res) {
          setIsValid(true);
          setIsDisabledInput(false);
          setQueryMessage(NOAUTHORIZE_TEXT);
          throw new Error(NOAUTHORIZE_TEXT);
        } else if (res.message) {
          setIsValid(true);
          setIsDisabledInput(false);
          setQueryMessage(res.message);
          throw new Error(res.message);
        } else {
          resetForm();
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((e) => console.log(e));
  };

  const handleUpdateUser = (data, setIsValid, setIsDisabledInput) => {
    api
      .updateProfile(data)
      .then((res) => {
        if (res.message) {
          setIsValid(true);
          setIsDisabledInput(false);
          setQueryMessage(res.message);
          throw new Error(res.message);
        } else {
          setIsValid(false);
          setIsDisabledInput(false);
          setQueryMessage(SACCESS_PROFILE_TEXT);
          setCurrentUser(res);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleLogout = () => {
    api
      .logout()
      .then((res) => {
        if (res.message) {
          throw new Error(res.message);
        } else {
          setCurrentUser({});
          setLoggedIn(false);
          history.push('/signin');
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              queryMessage={queryMessage}
              setQueryMessage={setQueryMessage}
            />
          </Route>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              queryMessage={queryMessage}
              setQueryMessage={setQueryMessage}
            />
          </Route>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            beatFilmMovies={beatFilmMovies}
          />
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onUpdate={handleUpdateUser}
            onLogout={handleLogout}
            queryMessage={queryMessage}
            setQueryMessage={setQueryMessage}
          />
          <ProtectedRoute loggedIn={loggedIn} component={NotFound} />
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
