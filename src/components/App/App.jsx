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
    return api
      .getUser()
      .then((res) => {
        setLoggedIn(true);
        setQueryMessage('');
        setCurrentUser(res);
        return res;
      })
      .catch(() => {
        setLoggedIn(false);
        setCurrentUser({});
        return null;
      });
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    const { pathname } = location;
    const isAuthRoute = pathname === '/signin' || pathname === '/signup';

    if (loggedIn && isAuthRoute) {
      history.push('/movies');
    }
  }, [loggedIn, location.pathname, history, location]);

  useEffect(() => {
    getMovies()
      .then((res) => {
        setBeatFilmMovies(res);
      })
      .catch(() => {});
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
          return api.authorize(email, password).then(() => api.getUser());
        }
      })
      .then((user) => {
        if (!user) return;
        resetForm();
        setLoggedIn(true);
        setCurrentUser(user);
        setQueryMessage('');
        history.push('/movies');
      })
      .catch((err) => {
        setIsValid(true);
        setIsDisabledInput(false);
        setQueryMessage(err?.message || NOREGISTER_TEXT);
      });
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
          return api.getUser();
        }
      })
      .then((user) => {
        if (!user) return;
        resetForm();
        setLoggedIn(true);
        setCurrentUser(user);
        setQueryMessage('');
        history.push('/movies');
      })
      .catch((err) => {
        setIsValid(true);
        setIsDisabledInput(false);
        setQueryMessage(err?.message || NOAUTHORIZE_TEXT);
      });
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
      .catch((err) => {
        setIsValid(true);
        setIsDisabledInput(false);
        setQueryMessage(err?.message || 'Ошибка при обновлении профиля. Повторите попытку позже');
      });
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
      .catch(() => {
        setCurrentUser({});
        setLoggedIn(false);
        history.push('/signin');
      });
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
