import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
  }

  setSubmitAction(handleConfirmationSubmit) {
    this._handleConfirmationSubmit = handleConfirmationSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmationSubmit();
    })
  }
}
