export default class FormValidator {
  constructor(validateConfig, element) {
    this._element = element;
    this._inputSelector = validateConfig.inputSelector;
    this._submitButtonSelector = validateConfig.submitButtonSelector;
    this._inactiveButtonClass = validateConfig.inactiveButtonClass;
    this._inputErrorClass = validateConfig.inputErrorClass;
    this._errorClass = validateConfig.errorClass;
    this._inputs = Array.from(this._element.querySelectorAll(this._inputSelector));
    this._formButton = this._element.querySelector(this._submitButtonSelector);
  }

  _enableButton = () => {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.removeAttribute('disabled');
  };

  _disableButton = () => {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.setAttribute('disabled', true);
  }

  _hasInvalidInput = () => {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _showInputError = (inputElement) => {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = document.getElementById(`${inputElement.name}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  };

  _hideInputError = (inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = document.getElementById(`${inputElement.name}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    })
  }

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  _setEventListener = () => {
    this._toggleButtonState();
    this._element.addEventListener('reset', () => {
      this._disableButton();
    });
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity (input);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._element.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListener();
  };
}
