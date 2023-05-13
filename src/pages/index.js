import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { profileOpenButton, buttonOpenCardPopup, initialCards, validateConfig } from '../utils/Constants.js';
import PopupWithImage from '../components/PopupWithimage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formValidators = {};

const enableValidation = (validateConfig) => {
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validateConfig, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

enableValidation(validateConfig);

const popupWithImage = new PopupWithImage('.popup_popup_image');
popupWithImage.setEventListeners();

const createCard = (cardData) => {
  const newCard = new Card (cardData, handleCardClick, '#card-template');

  const cardElement = newCard.generateCard();

  return cardElement;
}

const handleCardClick = (name, link) => {
  popupWithImage.open( name, link );
}

const cardList = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
    cardList.addItem(createCard({ name, link }), false);
  }
}, '.photo-grid__list');

cardList.renderItems();

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__title-subline'
});

const profileFormUser = new PopupWithForm({
  handleFormSubmit: () => {

    userInfo.setUserInfo(profileFormUser._getInputValues());

    profileFormUser.close();
  }
}, '.popup_popup_profile');

profileFormUser.setEventListeners();

profileOpenButton.addEventListener('click', () => {
  formValidators['profile-form'].resetValidation();
  profileFormUser.setData(userInfo.getUserInfo());
  profileFormUser.open();
});

const cardFormUser = new PopupWithForm({
  handleFormSubmit: ({ inputTitle, inputHref }) => {

    cardList.addItem(createCard({ name: inputTitle, link: inputHref }), true);
    cardFormUser.close();
  }
}, '.popup_popup_cards');

cardFormUser.setEventListeners();

buttonOpenCardPopup.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  cardFormUser.open();
});
