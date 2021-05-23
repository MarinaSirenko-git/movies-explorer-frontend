/* eslint-disable react/prop-types */
import React from 'react';
import './Form.css';

function Form({ isRegister }) {
  return (
    <form className="form">
      {isRegister ? (
        <label className="form__label" htmlFor="name">
          Имя
          <input className="form__input" name="name" type="text" required />
        </label>
      ) : null}
      <label className="form__label" htmlFor="email">
        E-mail
        <input className="form__input" name="email" type="email" required />
      </label>
      <label className="form__label" htmlFor="password">
        Пароль
        <input className="form__input" name="password" type="password" required />
      </label>
      <button className="form__btn" type="submit">
        {isRegister ? 'Зарегистрироваться' : 'Войти'}
      </button>
    </form>
  );
}

export default Form;
