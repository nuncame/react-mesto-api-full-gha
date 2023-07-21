class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: data.link,
        name: data.name,
      }),
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserData(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  setAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(data) {
    return fetch(`${this._url}cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(data, isLiked) {
    if (!isLiked) {
      return fetch(`${this._url}cards/${data}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkResponse);
    }
    return fetch(`${this._url}cards/${data}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://api.mesto-nuncame.nomoredomains.xyz/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export { api };
