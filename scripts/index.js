let buttonOpenPopup = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let buttonClosePopup = formElement.querySelector('.popup__close-icon');
let nameInput = formElement.querySelector('.popup__item_type_name');
let jobInput = formElement.querySelector('.popup__item_type_job');
let nameText = document.querySelector('.profile__title');
let jobText = document.querySelector('.profile__title-subline');
let form = formElement.querySelector('.popup__form');

function closePopup () {
  formElement.classList.remove('popup_opened');
};

buttonClosePopup.addEventListener('click', closePopup);

const closePopupByClickOnOverlay = function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
};

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

form.addEventListener('submit', handleFormSubmit);

