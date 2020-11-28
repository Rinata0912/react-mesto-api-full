import React, { useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export function Header({ onSignOut, userEmail }) {
  const location = useLocation();
  let btnText = 'Выйти';
  let path = '/';

  if (location.pathname === '/signup') {
    btnText = 'Войти';
    path = '/signin';
  } else if (location.pathname === '/signin') {
    btnText = 'Регистрация';
    path = '/signup';
  }

  const handleSignOut = useCallback(() => {
    onSignOut(path);
  }, [onSignOut, path]);

  return (
    <header className="header">
      <a href="/" className="logo">
        <img src={logo} alt="логотип" className="logo__img" />
      </a>
      <div className="header__content">
        <span className="header__user-email">{userEmail}</span>
        <Link to={path} onClick={handleSignOut} className="header__sign">
          {btnText}
        </Link>
      </div>
    </header>
  );
}
