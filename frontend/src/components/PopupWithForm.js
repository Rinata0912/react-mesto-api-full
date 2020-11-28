import React from 'react';
import popupCloseBtn from '../images/form_close-icon.svg';
import { useClosePopup } from '../utils/useClosePopup';

export function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  const handleOnClose = useClosePopup({ onClose, isOpen });

  return (
    <div
      className={`popup js-popup-${name} ${isOpen && 'popup_opened'}`}
      onClick={handleOnClose}
    >
      <div className="popup__container popup__container_size_m">
        <button className="popup__close-btn" type="button">
          <img
            src={popupCloseBtn}
            alt="закрыть форму"
            className="popup__close-icon"
            onClick={handleOnClose}
          />
        </button>
        <form
          className="form"
          name={`${name}ProfileForm`}
          onSubmit={onSubmit}
          noValidate
        >
          <h3 className="form__title">{title}</h3>
          {children}
        </form>
      </div>
    </div>
  );
}
