export default class Card {
  constructor( { name, link, _id, owner, likes }, handleCardClick, handleTrashButtonClick, handleLikeCard, handleDeleteLikeCard, userId, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._id = _id;
    this._owner = owner;
    this._likes = likes;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLikeCard = handleDeleteLikeCard;
    this._userId = userId;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setTrashButtonOnMyCards() {
    if (this._owner._id === this._userId) {
      this._trashButton.classList.add('card__trash-button_visible');
    }
  }

  _hasUserIdInLikesArray = () => {
    return this._likes.some((user) => {
      return user._id === this._userId;
    })
  }

  _drawLikeCounter = () => {
    this._element.querySelector('.card__like-number').textContent = this._likes.length;

    if (this._hasUserIdInLikesArray()) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }

  setLikesInfo = (likesArray) => {
    this._likes = likesArray;
    this._drawLikeCounter();
  }

  removeCard = (evt) => {
    this._element.remove();
  };

  _setEventListeners = () => {
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () => {
      if (this._hasUserIdInLikesArray()) {
        this._handleDeleteLikeCard(this._id);
      } else {
        this._handleLikeCard(this._id);
      }
    });
    this._trashButton = this._element.querySelector('.card__trash-button');
    this._setTrashButtonOnMyCards();
    this._trashButton.addEventListener('click', (evt) => {
      this._handleTrashButtonClick(this._id);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  };

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._element.querySelector('.card__title').textContent = this._name.slice(0, 1).toUpperCase() + this._name.slice(1);
    this._cardImage.alt = this._name.slice(0, 1).toUpperCase() + this._name.slice(1);
    this._drawLikeCounter();

    return this._element;
  }
}
