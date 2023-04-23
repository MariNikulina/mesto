validateConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

class FormValidator {
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

  hideInputError = (inputElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    const errorElement = document.getElementById(`${inputElement.name}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this.hideInputError(inputElement);
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

/*
function enableValidation ({formSelector, ...rest}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', evt => evt.preventDefault());
    setEventListener(form, rest);
  });
};

function setEventListener (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
    toggleButtonState(inputs, formButton, { inactiveButtonClass });
    form.addEventListener('reset', () => {
      disableButton(formButton, { inactiveButtonClass });
    });
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity (input, rest);
        toggleButtonState(inputs, formButton, { inactiveButtonClass });
      });
    });
};

function checkInputValidity (input, { inputErrorClass, errorClass }) {
  if (input.validity.valid) {
    hideInputError(input, { inputErrorClass, errorClass });
  } else {
    showInputError(input, { inputErrorClass, errorClass });
  }
};

function showInputError (input, { inputErrorClass, errorClass }) {
  input.classList.add(inputErrorClass);
          const errorElement = document.getElementById(`${input.name}-error`);
          errorElement.classList.add(errorClass);
          errorElement.textContent = input.validationMessage;
};

function hideInputError (input, { inputErrorClass, errorClass }) {
  input.classList.remove(inputErrorClass);
          const errorElement = document.getElementById(`${input.name}-error`);
          errorElement.classList.remove(errorClass);
          errorElement.textContent = '';
};


function toggleButtonState (inputs, button, { inactiveButtonClass}) {
  if (hasInvalidInput(inputs)) {
    disableButton(button, { inactiveButtonClass } );
  } else {
    enableButton(button, { inactiveButtonClass });
  }
}

function hasInvalidInput (inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

function enableButton (button, { inactiveButtonClass }) {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

function disableButton (button, { inactiveButtonClass }) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
}

enableValidation(validateConfig);*/
