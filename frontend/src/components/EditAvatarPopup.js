import React, { useEffect, useRef } from 'react';
import { PopupWithForm } from './PopupWithForm';

export function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarInputRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  useEffect(() => {
    avatarInputRef.current.value = '';
  }, [isOpen]);

  return(
    <PopupWithForm 
      title="Обновить аватар" 
      name="updateAvatar" 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input-container">
        <div className="form__control">
          <input 
            className="form__input js-input-avatar" 
            type="URL" 
            placeholder="Ссылка на картинку" 
            name="avatar" 
            required 
            ref={avatarInputRef}
          />
          <span className="form__input-error js-input-img-error" />
        </div>
      </fieldset>
      <button className="form__submit-btn">Сохранить</button>
    </PopupWithForm>
  )
}