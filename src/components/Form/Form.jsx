import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './Form.css';

function Form({ onSubmit, children }) {
  const location = useLocation();

  return (
    <form className="form" onSubmit={onSubmit}>
      {children}
      <button className="form__btn" type="submit">
        {location.pathname === '/signup' ? 'Зарегистрироваться' : 'Войти'}
      </button>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Form;
