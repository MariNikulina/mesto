let buttonOpenPopup = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup');
let buttonClosePopupReset = formElement.querySelector('.popup__close-icon');
let buttonClosePopupSubmet = formElement.querySelector('.popup__button');

function closePopupReset () {
  formElement.classList.remove('popup_opened');
}

buttonClosePopupReset.addEventListener('click', closePopupReset);

function handleFormSubmit (evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector('.popup__item_type_name');
  let jobInput = formElement.querySelector('.popup__item_type_job');

  nameInput = nameInput.value;
  jobInput = jobInput.value;
  let nameText = document.querySelector('.profile__title');
  let jobText = document.querySelector('.profile__title-subline');

  nameText.textContent = nameInput;
  jobText.textContent = jobInput;

  formElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);



function openPopup () {
  formElement.classList.add('popup_opened');

  let nameText = document.querySelector('.profile__title');
  let jobText = document.querySelector('.profile__title-subline');

  let nameInput = formElement.querySelector('.popup__item_type_name');
  let jobInput = formElement.querySelector('.popup__item_type_job');

  nameInput.value = nameText.textContent;
  jobInput.value = jobText.textContent;
}

buttonOpenPopup.addEventListener('click', openPopup);
