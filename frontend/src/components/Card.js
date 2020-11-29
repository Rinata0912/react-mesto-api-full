import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);

  function handleClick(evt) {
    evt.preventDefault();
    onCardClick(card);
  }

  function handleLikeClick(evt) {
    evt.preventDefault();
    onCardLike(card);
  }

  function handleDeleteClick(evt) {
    evt.preventDefault();
    onCardDelete(card);
  }

  return(
    <article className="card">
      <button 
        onClick={handleDeleteClick}
        className={`card__delete-btn ${isOwn && 'card__delete-btn_state_visible'}`} 
        type="button">
        <svg 
          className="card__delete-icon" 
          width="18" 
          height="20" 
          viewBox="0 0 18 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg">
          <defs/>
          <path d="M2.458 18.142c.06.67.61 1.158 1.28 1.158H14.26c.67 0 1.22-.508 1.28-1.158L16.72 5.79H1.28l1.179 12.352zM16.72 1.93h-5.14v-.65C11.58.569 11.011 0 10.3 0H7.72C7.01 0 6.44.569 6.44 1.28v.65H1.28C.569 1.93 0 2.499 0 3.21c0 .711.569 1.28 1.28 1.28h15.44c.711 0 1.28-.569 1.28-1.28 0-.711-.569-1.28-1.28-1.28z" fill="#fff"/>
        </svg>
      </button>
      <a className="card__show-image" href="/" onClick={handleClick}>
        <img src={card.link} alt="" className="card__image" />
      </a>
      <div className="card__content">
        <p className="card__title">{card.name}</p>
        <div className="card__like">
          <button onClick={handleLikeClick} className={`card__btn ${isLiked && 'card__btn-active'}`}>
            <svg 
              className="card__btn-icon"
              width="21" 
              height="19" 
              viewBox="0 0 21 19" 
              fill="currentcolor" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M18.8 1.959l.002.001c1.942 1.923 1.944 5.079-.002 7.024l-8.439 8.44-8.414-8.415-.002-.002A5.013 5.013 0 01.5 5.482v-.004a4.93 4.93 0 011.443-3.52h0l.001-.001C3.866.016 7.022.013 8.968 1.977l.001.002 1.038 1.04.358.357.353-.361 1.036-1.058a4.986 4.986 0 017.047.002z" stroke="#000"  />
            </svg>
          </button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </article>);
}