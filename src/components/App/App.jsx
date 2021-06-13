import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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

  const handleRegister = ({ name, email, password }) => {
    api
      .register(name, email, password)
      .then((res) => {
        if (!res) {
          setQueryError('Ошибка при регистрации. Повторите попытку позже');
          throw new Error('Ошибка при регистрации. Повторите попытку позже');
        } else if (res.message) {
          setQueryError(res.message);
          throw new Error(res.message);
        } else {
          setLoggedIn(false);
          setCurrentUser(res);
          history.push('/signin');
        }
      })
      .catch((e) => console.log(e));
  };

  const handleLogin = ({ email, password }) => {
    api
      .authorize(email, password)
      .then((res) => {
        if (!res) {
          setQueryError('Ошибка при авторизации. Повторите попытку позже');
          throw new Error('Ошибка при авторизации. Повторите попытку позже');
        } else if (res.message) {
          setQueryError(res.message);
          throw new Error(res.message);
        } else {
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
          setQueryError('');
          setLoggedIn(true);
          setCurrentUser(res);
          history.push('/movies');
        }
      })
      .catch((e) => {
        console.log(e);
        history.push('/signin');
      });
  }, [history]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  const handleUpdateUser = (data) => {
    api
      .updateProfile(data)
      .then((res) => {
        if (res.message) {
          setQueryError(res.message);
          throw new Error(res.message);
        } else {
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
          <ProtectedRoute path="/" exact loggedIn={loggedIn} component={Main} />
          <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} />
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onUpdate={handleUpdateUser}
            onLogout={handleLogout}
          />
          <ProtectedRoute path="*" loggedIn={loggedIn} component={NotFound} />
          <Route path="/" exact>
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
