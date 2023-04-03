const buttonOpenPopup = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup_popup_profile');
const nameInput = formElement.querySelector('.popup__item_type_name');
const jobInput = formElement.querySelector('.popup__item_type_job');
const nameText = document.querySelector('.profile__title');
const jobText = document.querySelector('.profile__title-subline');
const formProfile = formElement.querySelector('.popup__form_popup_profile');
const imagePopup = document.querySelector('.popup_popup_image');
const formCardPopup = document.querySelector('.popup_popup_cards');
const titleInput = formCardPopup.querySelector('.popup__item_type_title');
const hrefInput = formCardPopup.querySelector('.popup__item_type_href');
const formCard = formCardPopup.querySelector('.popup__form_popup_cards');
const cardContainer = document.querySelector('.photo-grid__list');
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const pictureImage = imagePopup.querySelector('.popup__picture');
const titleImageText = imagePopup.querySelector('.popup__title_popup_image');
const popup = document.querySelector('.popup');
const cardTemplate = document.querySelector('#card-template').content;
const closeButtons = document.querySelectorAll('.popup__close-icon');


function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeCardByEscapeOrClickOnOverlay);
  deleteTextError(popup);
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openProfilePopup () {

  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;

  openPopup(formElement);

};

buttonOpenPopup.addEventListener('click', () => openProfilePopup());

function handleFormSubmit (evt) {
  evt.preventDefault();

  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;

  closePopup(formElement);
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

/*открытие попапов и закрытие по клику и кнопке Esc*/
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeCardByEscapeOrClickOnOverlay);
  popup.addEventListener('click', closeCardByEscapeOrClickOnOverlay);
};



buttonOpenCardPopup.addEventListener('click', () => {
  formCard.reset();
  openPopup(formCardPopup)
});

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
  openPopup(imagePopup);
};

function createCard (cardData) {
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

  cardImage.addEventListener('click', () => handleFormImage(cardData));

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

  closePopup(formCardPopup);

  formCard.reset();
};

formCard.addEventListener('submit', addCardFormSubmit);

initialCards.forEach((cardData) => {
  const newCardFromInitialCards = createCard (cardData);
  cardContainer.append(newCardFromInitialCards);
});

function closeCardByEscapeOrClickOnOverlay (evt) {
  if (evt.key === 'Escape' || evt.target === evt.currentTarget) {
    const cardActive = document.querySelector('.popup_opened');
    if (cardActive) {
      closePopup(cardActive);
    };
  };
};

function deleteTextError (form) {
  const inputs = Array.from(form.querySelectorAll('.popup__item'));
  inputs.forEach((input) => {
    input.classList.remove('popup__item_type_error');
    const errorElement = document.getElementById(`${input.name}-error`);
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  });
}
