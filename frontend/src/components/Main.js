import React, { useContext } from 'react';
import editBtn from '../images/button-edit_icon.svg';
import addBtn from '../images/button-add_icon.svg';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main({
  onAddPlace,
  onEditAvatar,
  onEditProfile,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar">
            <img
              src={avatar}
              alt="фотография пользователя"
              className="profile__avatar-img"
            />
            <button className="profile__avatar-edit" onClick={onEditAvatar}>
              <svg
                className="profile__avatar-edit-icon"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs />
                <path
                  d="M26 3.454L6.77 22.794 3.336 19.29 22.517 0 26 3.454zM0 26l5.102-1.53-3.581-3.453L0 26z"
                  fill="#fff"
                />
              </svg>
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__name">{name}</h1>
              <button
                className="profile__btn profile__btn_type_edit"
                type="button"
                onClick={onEditProfile}
              >
                <img
                  src={editBtn}
                  alt="редактировать профиль"
                  className="profile__btn-icon profile__btn-icon_type_edit"
                />
              </button>
            </div>
            <p className="profile__job">{about}</p>
          </div>
        </div>
        <button
          className="profile__btn profile__btn_type_add"
          type="button"
          onClick={onAddPlace}
        >
          <img src={addBtn} alt="добавить карточку" />
        </button>
      </section>
      <section className="cards-gallery">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </section>
    </main>
  );
}
