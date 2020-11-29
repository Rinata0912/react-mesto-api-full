import React, { useCallback, useEffect, useState } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { ImagePopup } from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { ConfirmDeletePopup } from './ConfirmDeletePopup';
import { Register } from './Register';
import { Login } from './Login';
import { Switch, Route, useHistory } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { InfoTooltip } from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(
    false
  );
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isLogin) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then((values) => {
          const [initCards, userInfo] = values;
          setCards(initCards.data);
          setCurrentUser(userInfo.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLogin]);

  const handleSetCurrentUserEmail = useCallback((email) => {
    setCurrentUserEmail(email);
  }, []);

  const handleTokenCheck = useCallback(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api
        .checkToken(token)
        .then((res) => {
          if (res) {
            setIsLogin(true);
            handleSetCurrentUserEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => err);
    }
  }, [history, handleSetCurrentUserEmail]);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  const handleRegister = useCallback((userData) => {
    api
      .signUp(userData)
      .then(() => {
        history.push('/signin');
        setIsRegister(true);
      })
      .catch((err) => {
        console.log(err);
        setIsRegister(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }, [history]);

  const handleLogin = useCallback((userData) => {
    api
      .signIn(userData)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        api
          .checkToken(res.token)
          .then((res) => {
            setIsLogin(true);
            handleSetCurrentUserEmail(res.data.email);
            history.push('/');
          })
          .catch((err) => err);
      })
      .catch((err) => {
        console.log(err);
        setIsRegister(false);
        setIsInfoTooltipOpen(true);
      });
  }, [handleSetCurrentUserEmail, history]);

  const handleSignOut = useCallback((path) => {
    if (path === '/') {
      localStorage.removeItem('jwt');
      setIsLogin(false);
      setCurrentUserEmail('');
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={handleSignOut} userEmail={currentUserEmail} />
        <Switch>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <ProtectedRoute path="/" isLogin={isLogin}>
            <Main
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDeleteClick}
            />
            <Footer />
          </ProtectedRoute>
        </Switch>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isRegister || isLogin}
          isRegister={isRegister}
        />

        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmDeletePopup
          onCardDelete={handleCardDelete}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmDeleteClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfileInfo(name, about)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);

    api
      .toggleLikeCard(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete() {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((i) => i._id !== deletedCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
}

export default App;
