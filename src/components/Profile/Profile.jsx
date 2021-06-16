import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useValidate from '../../hooks/useValidate';

function Profile({ loggedIn, onUpdate, onLogout, queryMessage, setQueryMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const userData = {
    name: currentUser.name,
    email: currentUser.email,
  };

  const {
    data,
    handleChange,
    nameError,
    emailError,
    isValid,
    setIsValid,
    isDisabledInput,
    setIsDisabledInput,
  } = useValidate(userData);

  useEffect(() => {
    setQueryMessage('');
  }, [emailError, setQueryMessage]);

  useEffect(() => {
    setIsValid(false);
  }, [setIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(data, setIsValid, setIsDisabledInput);
    setIsValid(false);
    setIsDisabledInput(true);
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
              className={`profile__input ${nameError ? 'profile__input_error' : ''}`}
              value={data.name}
              onChange={handleChange}
              type="text"
              name="name"
              required
              disabled={isDisabledInput}
            />
          </label>
          {nameError && <span className="profile__error">{nameError}</span>}
          <label className="profile__label" htmlFor="user-email">
            <span className="profile__subtitle profile__subtitle_bottom">E-mail</span>
            <input
              className={`profile__input profile__input_bottom ${
                emailError ? 'profile__input_error' : ''
              }`}
              id="user-email"
              value={data.email}
              onChange={handleChange}
              type="email"
              name="email"
              required
              disabled={isDisabledInput}
            />
          </label>
          {emailError && <span className="profile__error">{emailError}</span>}
          {queryMessage && <span className="profile__query-error">{queryMessage}</span>}
          <button className="profile__btn profile__btn_type_edit" type="submit" disabled={!isValid}>
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
  queryMessage: PropTypes.string.isRequired,
  setQueryMessage: PropTypes.func.isRequired,
};

export default Profile;
