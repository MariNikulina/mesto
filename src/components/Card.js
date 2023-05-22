export default class Card {
  constructor( { name, link }, handleCardClick, handleTrashButtonClick, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleCardClick = handleCardClick;
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

  removeCard = () => {
    this._card = this.generateCard();
    this._card.remove();
  };

  _setEventListeners = () => {
    this._element.querySelector('.card__like-button').addEventListener('click', this._toggleLikeCard);
    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._handleTrashButtonClick();
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
    this._element.querySelector('.card__like-number').textContent = 0;

    return this._element;
  }
}
