import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export function ConfirmDeletePopup({onClose, onCardDelete, isOpen}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete();
  }

  return(
    <PopupWithForm 
      title="Вы уверены?" 
      name="confirm" 
      onClose={onClose} 
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <button className="form__submit-btn">Да</button>
    </PopupWithForm>
  )
}