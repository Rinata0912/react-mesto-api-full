import React, { useRef } from 'react';
import { PopupWithForm } from './PopupWithForm';

export function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const inputNameRef = useRef();
  const inputLinkRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: inputNameRef.current.value,
      link: inputLinkRef.current.value,
    });
  }

  return(
    <PopupWithForm 
      title="Новое место" 
      name="add" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input-container">
        <div className="form__control">
          <input 
            className="form__input js-input-place" 
            type="text" placeholder="Название" 
            name="place" 
            required 
            minLength="2" 
            maxLength="30" 
            ref={inputNameRef}
          />
          <span className="form__input-error js-input-place-error" />
        </div>
        <div className="form__control">
          <input 
            className="form__input js-input-img" 
            type="URL" 
            placeholder="Ссылка на картинку" 
            name="image" 
            required 
            ref={inputLinkRef}
          />
          <span className="form__input-error js-input-img-error" />
        </div>
      </fieldset>
      <button className="form__submit-btn">Создать</button>
    </PopupWithForm>
  )
}