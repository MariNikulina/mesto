import Card from './Card.js';
import { profileOpenButton, profilePopup,  nameInput, jobInput, nameText, jobText, profileForm, imagePopup, cardPopup,
  titleInput, hrefInput, cardForm, cardContainer, buttonOpenCardPopup, pictureImage, titleImageText, popups,
  validationProfileForm, validationCardForm, initialCards } from './Constants.js';

validationProfileForm.enableValidation();
validationCardForm.enableValidation();

function openProfilePopup () {

  deleteProfileTextError(profileForm);

  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;

  openPopup(profilePopup);

};

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeCardByEscape);
};

const openImagePopup = (cardData) => {
  pictureImage.src = cardData.link;
  pictureImage.alt = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  titleImageText.textContent = cardData.name.slice(0, 1).toUpperCase() + cardData.name.slice(1);
  openPopup(imagePopup);
};

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

function closeCardByEscape (evt) {
  if (evt.key === 'Escape') {
    const cardActive = document.querySelector('.popup_opened');
    if (cardActive) {
      closePopup(cardActive);
    };
  };
};

profileOpenButton.addEventListener('click', () => openProfilePopup());

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  nameText.textContent = nameInput.value;
  jobText.textContent = jobInput.value;

  closePopup(profilePopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

buttonOpenCardPopup.addEventListener('click', () => {
  openPopup(cardPopup)
});

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


function deleteProfileTextError (form) {
  const inputs = Array.from(form.querySelectorAll('.popup__item'));
  inputs.forEach((input) => {
    validationProfileForm.hideInputError(input);
  });
}

export {openImagePopup};
