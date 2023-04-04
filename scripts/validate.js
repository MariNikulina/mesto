validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

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

enableValidation(validateConfig);
