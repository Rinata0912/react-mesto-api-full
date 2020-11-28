import React from 'react';
import popupCloseBtn from '../images/form_close-icon.svg';
import { useClosePopup } from '../utils/useClosePopup';

export function ImagePopup({card, onClose, isOpen}) {
  
  const handleOnClose = useClosePopup({onClose, isOpen});

  return (
    <div 
      className={`popup js-popup-show-card ${isOpen && `popup_opened`}`} 
      onClick={handleOnClose}>
      {card && (
        <div className="popup__container">
          <button className="popup__close-btn" type="button">
            <img 
              src={popupCloseBtn} 
              alt="закрыть форму" 
              className="popup__close-icon" 
              onClick={handleOnClose}/>
          </button>
          <img className="card__img-full" src={card.link} alt="" />
          <p className="card__img-caption">{card.name}</p>
        </div>
      )}
    </div>
  );
}