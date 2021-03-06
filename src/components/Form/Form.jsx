import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './Form.css';

function Form({ onSubmit, children, isValid, queryMessage }) {
  const location = useLocation();

  return (
    <form className="form" onSubmit={onSubmit}>
      {children}
      <div className="form__btn-wrap">
        <span className="form__query-error">{queryMessage}</span>
        <button className="form__btn" type="submit" disabled={!isValid}>
          {location.pathname === '/signup' ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  isValid: PropTypes.bool.isRequired,
  queryMessage: PropTypes.string.isRequired,
};

export default Form;
