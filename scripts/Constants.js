import FormValidator from './Validate.js';

const profileOpenButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_popup_profile');
const nameInput = profilePopup.querySelector('.popup__item_type_name');
const jobInput = profilePopup.querySelector('.popup__item_type_job');
const nameText = document.querySelector('.profile__title');
const jobText = document.querySelector('.profile__title-subline');
const profileForm = document.forms['profile-form'];
const imagePopup = document.querySelector('.popup_popup_image');
const cardPopup = document.querySelector('.popup_popup_cards');
const titleInput = cardPopup.querySelector('.popup__item_type_title');
const hrefInput = cardPopup.querySelector('.popup__item_type_href');
const cardForm = document.forms['card-form'];
const cardContainer = document.querySelector('.photo-grid__list');
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const pictureImage = imagePopup.querySelector('.popup__picture');
const titleImageText = imagePopup.querySelector('.popup__title_popup_image');
const popups = document.querySelectorAll('.popup');

const validateConfig = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

const validationProfileForm = new FormValidator(validateConfig, profileForm);
const validationCardForm = new FormValidator(validateConfig, cardForm);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export { profileOpenButton, profilePopup,  nameInput, jobInput, nameText, jobText, profileForm, imagePopup, cardPopup,
  titleInput, hrefInput, cardForm, cardContainer, buttonOpenCardPopup, pictureImage, titleImageText, popups,
  validationProfileForm, validationCardForm, initialCards };
