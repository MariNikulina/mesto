import { pictureImage, titleImageText, openImagePopup, openPopup, imagePopup} from './index.js'

export default class Card {
  constructor(cardData, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = cardData.name;
    this._link = cardData.link;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _toggleLikeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  };

  _removeCard = (evt) => {
    evt.target.closest('.card').remove();
  };

  _openImagePopupFromCard() {
    openImagePopup({
      name: this._name,
      link: this._link
    })
  };

  _setEventListeners = () => {
    this._element = this._getTemplate();
    this._element.querySelector('.card__like-button').addEventListener('click', this._toggleLikeCard);
    this._element.querySelector('.card__trash-button').addEventListener('click', this._removeCard);
    this._element.querySelector('.card__image').addEventListener('click', () => this._openImagePopupFromCard());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name.slice(0, 1).toUpperCase() + this._name.slice(1);
    this._element.querySelector('.card__image').alt = this._name.slice(0, 1).toUpperCase() + this._name.slice(1);

    return this._element;
  }
}
