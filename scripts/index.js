const buttonOpenPopup = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup_popup_profile');
const buttonClosePopup = formElement.querySelector('.popup__close-icon');
const nameInput = formElement.querySelector('.popup__item_type_name');
const jobInput = formElement.querySelector('.popup__item_type_job');
const nameText = document.querySelector('.profile__title');
const jobText = document.querySelector('.profile__title-subline');
const formProfile = formElement.querySelector('.popup__form_popup_profile');
const imagePopup = document.querySelector('.popup_popup_image');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close-icon');
const formCardPopup = document.querySelector('.popup_popup_cards');
const titleInput = formCardPopup.querySelector('.popup__item_type_title');
const hrefInput = formCardPopup.querySelector('.popup__item_type_href');
const formCard = formCardPopup.querySelector('.popup__form_popup_cards');
const cardContainer = document.querySelector('.photo-grid__list');
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const pictureImage = imagePopup.querySelector('.popup__picture');
const titleImageText = imagePopup.querySelector('.popup__title_popup_image');
const buttonCloseCardPopup = formCardPopup.querySelector('.popup__close-icon');


function closePopup () {
  formElement.classList.remove('popup_opened');
};

buttonClosePopup.addEventListener('click', closePopup);

/*
const closePopupByClickOnOverlay = function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
};
*/

function openPopup () {

  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;

  formElement.classList.add('popup_opened');

};

buttonOpenPopup.addEventListener('click', openPopup);


function handleFormSubmit (evt) {
  evt.preventDefault();

  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;

  closePopup();
};

formProfile.addEventListener('submit', handleFormSubmit);


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

/*открытие попапа добавления карточки*/
function openCardPopup () {
  titleInput.value = '';
  hrefInput.value = '';
  formCardPopup.classList.add('popup_opened');
};

buttonOpenCardPopup.addEventListener('click', openCardPopup);

/*закрытие попапа добавления карточки*/
function closeCardPopup () {
  formCardPopup.classList.remove('popup_opened');
};

buttonCloseCardPopup.addEventListener('click', closeCardPopup);

/*открытие попапа увеличения картинки*/
function openImagePopup () {
  imagePopup.classList.add('popup_opened');
};

/*закрытие попапа увеличения картинки*/
function closeImagePopup () {
  imagePopup.classList.remove('popup_opened');
};

buttonCloseImagePopup.addEventListener('click', closeImagePopup);

/*Переключение лайков карточки*/
function toggleLikeCard (evt) {
  evt.target.classList.toggle('card__like-button_active');
};

/*Удаление карточки*/
function removeCard (evt) {
  evt.target.closest('.card').remove();
};

/*Открытие попапа с увеличенным изображением*/
function handleFormImage (cardData) {
  pictureImage.src = cardData.link;
  pictureImage.alt = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  titleImageText.textContent = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  openImagePopup();
};

function createCard (cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
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

  cardImage.addEventListener('click', () => {
    handleFormImage(cardData);
  });

  return cardElement;
};

/*функция добавления данных карточки в разметку*/
function addCardFormSubmit (evt) {
  evt.preventDefault();

  const newCard = createCard({
    name: titleInput.value,
    link: hrefInput.value
  });

  cardContainer.prepend(newCard);

  closeCardPopup();
};

formCard.addEventListener('submit', addCardFormSubmit);

initialCards.forEach((cardData) => {
  const newCardFromInitialCards = createCard (cardData);
  cardContainer.append(newCardFromInitialCards);
});

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
  popup.addEventListener('keydown', (evt) => {
    if (evt.key === 'Esc') {
      console.log(evt.key);
      closePopup(popup);
    }
  })
})
