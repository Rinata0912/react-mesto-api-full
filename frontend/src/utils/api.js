class Api {
  constructor(options) {
    this._options = options;
  }

  _handleOriginalRes = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  };

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  editProfileInfo(name, about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  checkToken(jwt) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  addCard(name, link) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  likeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._options.headers,
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  unlikeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  toggleLikeCard(id, isLiked) {
    return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._options.headers,
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  updateAvatar(avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  signUp({ password, email }) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }

  signIn({ password, email }) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then(this._handleOriginalRes)
      .then((res) => res);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '0104c4f6-b4d1-4baf-96ce-c414c2f8cbbe',
    'Content-Type': 'application/json',
  },
});

const authApi = new Api({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api, authApi };
