export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this._cardActive = document.querySelector('.popup_opened');
      if (this._cardActive) {
        this._cardActive.classList.remove('popup_opened');
      }
    };
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  _resetCallback = () => {
    this._reset();
    this._popup.removeEventListener('animationend', this._resetCallback);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    if (this._reset) {
      this._popup.addEventListener('animationend', this._resetCallback);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        this.close();
      }
    });
  }
}
