import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor( { handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__item');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setData({ inputName: nameUser, inputJob: jobUser }) {
    const obj = { inputName: nameUser, inputJob: jobUser };
    this._inputList.forEach((inputElement) => {
      Object.keys(obj).forEach((key) => {

        if (key === inputElement.name) {
          inputElement.value = obj[key];
        }
      })
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  _reset = () => {
    this._formElement.reset();
  }


  close() {
    super.close(this._reset);
  }
}
