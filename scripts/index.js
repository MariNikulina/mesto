import Card from './Card.js';
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
const cardTemplate = document.querySelector('#card-template').content;

const validationProfileForm = new FormValidator(validateConfig, profileForm);
const validationCardForm = new FormValidator(validateConfig, cardForm);

validationProfileForm.enableValidation();
validationCardForm.enableValidation();

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeCardByEscape);
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-icon')) {
      closePopup(popup);
    }
  });
});

function openProfilePopup () {

  deleteProfileTextError(profileForm);

  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;

  openPopup(profilePopup);

};

profileOpenButton.addEventListener('click', () => openProfilePopup());

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;

  closePopup(profilePopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);


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

/*открытие попапов*/
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeCardByEscape);
};

buttonOpenCardPopup.addEventListener('click', () => {
  openPopup(cardPopup)
});

export {openImagePopup};


/*Переключение лайков карточки*/
/*function toggleLikeCard (evt) {
  evt.target.classList.toggle('card__like-button_active');
};

/*Удаление карточки*/
/*function removeCard (evt) {
  evt.target.closest('.card').remove();
};

/*Открытие попапа с увеличенным изображением*/
const openImagePopup = (cardData) => {
  pictureImage.src = cardData.link;
  pictureImage.alt = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  titleImageText.textContent = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  openPopup(imagePopup);
};

/*function createCard (cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonTrash = cardElement.querySelector('.card__trash-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  cardTitle.textContent = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);

  buttonLike.addEventListener('click', toggleLikeCard);

  buttonTrash.addEventListener('click', removeCard);

  cardImage.addEventListener('click', () => openImagePopup(cardData));

  return cardElement;
};*/

function createCard (cardData) {
  const newCard = new Card (cardData, '#card-template');

  const cardElement = newCard.generateCard();

  return cardElement;
}

/*функция добавления данных карточки в разметку*/
function handleCardFormSubmit (evt) {
  evt.preventDefault();

  const newCard = createCard ({
    name: titleInput.value,
    link: hrefInput.value
  });

  cardContainer.prepend(newCard);

  closePopup(cardPopup);

  cardForm.reset();
};

cardForm.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach((cardData) => {
  const newCardFromInitialCards = createCard (cardData);
  cardContainer.append(newCardFromInitialCards);
});

function closeCardByEscape (evt) {
  if (evt.key === 'Escape') {
    const cardActive = document.querySelector('.popup_opened');
    if (cardActive) {
      closePopup(cardActive);
    };
  };
};

function deleteProfileTextError (form) {
  const inputs = Array.from(form.querySelectorAll('.popup__item'));
  inputs.forEach((input) => {
    validationProfileForm.hideInputError(input);
  });
}

/*input.classList.remove('popup__item_type_error');
    const errorElement = document.getElementById(`${input.name}-error`);
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';*/


