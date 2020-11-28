import React, { useState } from 'react';

export function Login({ onLogin }) {
  const [userData, setUserData] = useState({
    password: '',
    email: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(userData);
  };

  return (
    <>
      <div className="sign">
        <h2 className="sign__title">Вход</h2>
        <form onSubmit={handleSubmit} className="sign__form">
          <input
            type="email"
            className="sign__input"
            placeholder="Email"
            required
            name="email"
            onChange={handleChange}
            value={userData.email}
          ></input>
          <input
            type="password"
            className="sign__input"
            placeholder="Пароль"
            required
            name="password"
            onChange={handleChange}
            value={userData.password}
          ></input>
          <button className="sign__btn">Войти</button>
        </form>
      </div>
    </>
  );
}
