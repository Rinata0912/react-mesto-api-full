import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupWithForm } from './PopupWithForm';

export function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__input-container">
        <div className="form__control">
          <input
            onChange={handleNameChange}
            className="form__input js-input-name"
            type="text"
            placeholder="Имя"
            name="name"
            required
            minLength="2"
            maxLength="40"
            value={name}
          />
          <span className="form__input-error js-input-name-error" />
        </div>
        <div className="form__control">
          <input
            onChange={handleDescriptionChange}
            className="form__input js-input-job"
            type="text"
            placeholder="О себе"
            name="job"
            required
            minLength="2"
            maxLength="200"
            value={description}
          />
          <span className="form__input-error js-input-job-error" />
        </div>
      </fieldset>
      <button className="form__submit-btn">Сохранить</button>
    </PopupWithForm>
  );
}
