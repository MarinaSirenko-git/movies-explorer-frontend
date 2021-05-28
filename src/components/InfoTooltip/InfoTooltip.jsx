import React from 'react';
import './InfoTooltip.css';

function InfoTooltip() {
  return (
    <div className="popup">
      <div className="popup__wrap">
        <button className="popup__close-icon" aria-label="Закрыть" type="button" />
        <h2 className="popup__title">Вы успешно зарегестрировались :)</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
