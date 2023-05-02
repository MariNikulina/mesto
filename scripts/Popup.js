export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      const cardActive = document.querySelector('popup_opened');
      if (cardActive) {
        closePopup(cardActive);
      };
    };
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(this._popup);
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(this._popup);
      }
    });
  }
}
