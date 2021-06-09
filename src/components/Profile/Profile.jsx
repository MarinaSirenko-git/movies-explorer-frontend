import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useValidate from '../../hooks/useValidate';

function Profile({ loggedIn, onUpdate, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const userData = {
    name: currentUser.name,
    email: currentUser.email,
  };

  const { data, handleChange, nameError, emailError, isValid, resetForm } = useValidate(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(data);
    resetForm();
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
              id="user-name"
              value={data.name}
              onChange={handleChange}
              type="text"
              name="name"
              required
            />
          </label>
          {nameError && <span className="profile__error">{nameError}</span>}
          <label className="profile__label" htmlFor="user-email">
            <span className="profile__subtitle profile__subtitle_bottom">E-mail</span>
            <input
              className="profile__input profile__input_bottom"
              id="user-email"
              value={data.email}
              onChange={handleChange}
              type="email"
              name="email"
              required
            />
          </label>
          {emailError && <span className="profile__error">{emailError}</span>}
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
};

export default Profile;
