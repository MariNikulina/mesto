export default class Api {
  constructor(hostRequest, token, cohortId) {
    this._hostRequest = hostRequest;
    this._token = token;
    this._cohortId = cohortId;
  }

  _checkResponse = (res) => {
    return res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  //1. Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(this._hostRequest + this._cohortId + '/users/me', {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse())
  }

  //2. Загрузка карточек с сервера
  getInitialCards() {
    return fetch(this._hostRequest + this._cohortId + '/cards', {
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse())
  }

  //3. Редактирование профиля
  updateUserInfo({ name, about }) {
    return fetch(this._hostRequest + this._cohortId + '/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse())
  }

  //4. Добавление новой карточки
  createNewCard({ name, link }) {
    return fetch(this._hostRequest + this._cohortId + '/cards', {
      method: 'POST',
      body: JSON.stringify({ name, link }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse())
  }

  //7. Удаление карточки
  deleteCard(id) {
    return fetch(this._hostRequest + this._cohortId + '/cards/' + id, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse())
  }

  //8. Постановка лайка
  likeCard(id) {
    return fetch(this._hostRequest + this._cohortId + '/cards/' + id + '/likes', {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse())
  }

  //8. Снятие лайка
  dislikeCard(id) {
    return fetch(this._hostRequest + this._cohortId + '/cards/' + id + '/likes', {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._checkResponse())
  }

  //9. Обновление аватара пользователя
  updateAvatar({ avatar }) {
    return fetch(this._hostRequest + this._cohortId + '/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse())
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }
}
