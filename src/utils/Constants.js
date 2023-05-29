const profileOpenButton = document.querySelector('.profile__edit-button');
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const avatarUpdate = document.querySelector('.profile__img-wrap');
const saveButton = document.querySelector('.popup__button');

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

export { profileOpenButton, buttonOpenCardPopup, avatarUpdate, saveButton, validateConfig };
