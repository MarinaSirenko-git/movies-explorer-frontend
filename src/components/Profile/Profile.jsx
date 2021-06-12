import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {
  NAME_REGEX,
  EMAIL_REGEX,
  NOEMPTY_TEXT,
  INVALID_EMAIL_TEXT,
  INVALID_NAME_TEXT,
} from '../../utils/consts';

function Profile({ loggedIn, onUpdate, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setName(String(currentUser.name));
  }, [currentUser]);

  useEffect(() => {
    setEmail(String(currentUser.email));
  }, [currentUser]);

  useEffect(() => {
    if (errorName || errorEmail) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [errorName, errorEmail, name, email]);

  const handleChangeName = (e) => {
    const { value } = e.target;
    setName(value);
    if (value === '') {
      setErrorName(NOEMPTY_TEXT);
    } else if (!NAME_REGEX.test(value)) {
      setErrorName(INVALID_NAME_TEXT);
    } else {
      setErrorName('');
    }
  };

  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
    if (value === '') {
      setErrorEmail(NOEMPTY_TEXT);
    } else if (!EMAIL_REGEX.test(value)) {
      setErrorEmail(INVALID_EMAIL_TEXT);
    } else {
      setErrorEmail('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      name,
      email,
    });
  };

  return (
    <div className="profile">
      <Header loggedIn={loggedIn} />
      <main className="profile__content">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" name="user-data" onSubmit={handleSubmit}>
          <label className="profile__label" htmlFor="user-name">
            <span className="profile__subtitle">Имя</span>
            <input
              className="profile__input"
              value={name}
              onChange={handleChangeName}
              type="text"
              name="name"
              required
            />
          </label>
          {errorName && <span className="profile__error">{errorName}</span>}
          <label className="profile__label" htmlFor="user-email">
            <span className="profile__subtitle profile__subtitle_bottom">E-mail</span>
            <input
              className="profile__input profile__input_bottom"
              id="user-email"
              value={email}
              onChange={handleChangeEmail}
              type="email"
              name="email"
              required
            />
          </label>
          {errorEmail && <span className="profile__error">{errorEmail}</span>}
          <button
            className="profile__btn profile__btn_type_edit"
            type="submit"
            disabled={!formValid}
          >
            Редактировать
          </button>
        </form>
        <button className="profile__btn profile__btn_type_logout" type="button" onClick={onLogout}>
          Выйти из аккаунта
        </button>
      </main>
    </div>
  );
}

Profile.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Profile;
