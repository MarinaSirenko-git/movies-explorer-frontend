import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
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

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [queryError, setQueryError] = useState('');

  const handleRegister = ({ name, email, password }, resetForm, setIsValid, setIsDisabledInput) => {
    api
      .register(name, email, password)
      .then((res) => {
        if (!res) {
          setIsValid(true);
          setIsDisabledInput(false);
          setQueryError('Ошибка при регистрации. Повторите попытку позже');
          throw new Error('Ошибка при регистрации. Повторите попытку позже');
        } else if (res.message) {
          setIsValid(true);
          setIsDisabledInput(false);
          setQueryError(res.message);
          throw new Error(res.message);
        } else {
          resetForm();
          setLoggedIn(true);
          setCurrentUser(res);
          history.push('/signup');
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
          setQueryError('Ошибка при авторизации. Повторите попытку позже');
          throw new Error('Ошибка при авторизации. Повторите попытку позже');
        } else if (res.message) {
          setIsValid(true);
          setIsDisabledInput(false);
          setQueryError(res.message);
          throw new Error(res.message);
        } else {
          resetForm();
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((e) => console.log(e));
  };

  const tokenCheck = useCallback(() => {
    api
      .getUser()
      .then((res) => {
        if (res.message) {
          throw new Error('Требуется авторизация');
        } else {
          setLoggedIn(true);
          setQueryError('');
          setCurrentUser(res);
        }
      })
      .catch((e) => {
        console.log(e);
        history.push('/signin');
      });
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleUpdateUser = (data, setIsValid, setIsDisabledInput) => {
    api
      .updateProfile(data)
      .then((res) => {
        if (res.message) {
          setIsValid(true);
          setIsDisabledInput(false);
          setQueryError(res.message);
          throw new Error(res.message);
        } else {
          setIsValid(false);
          setIsDisabledInput(false);
          setQueryError('');
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
              queryError={queryError}
              setQueryError={setQueryError}
            />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} queryError={queryError} setQueryError={setQueryError} />
          </Route>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} />
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onUpdate={handleUpdateUser}
            onLogout={handleLogout}
            queryError={queryError}
            setQueryError={setQueryError}
          />
          <ProtectedRoute path="*" loggedIn={loggedIn} component={NotFound} />
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
