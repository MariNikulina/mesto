import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { profileOpenButton, buttonOpenCardPopup, avatarUpdate, saveButton, validateConfig } from '../utils/Constants.js';
import PopupWithImage from '../components/PopupWithimage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

let userId = null; //"e07ae8aff37389f36cde0529"

const formValidators = {};

const enableValidation = (validateConfig) => {
  const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
  formList.forEach((formElement) => {
    if (formElement !== 'confirmation-form') {
      const validator = new FormValidator(validateConfig, formElement);
      const formName = formElement.getAttribute('name');
      formValidators[formName] = validator;
      validator.enableValidation();
    }
  })
}

enableValidation(validateConfig);

const popupWithImage = new PopupWithImage('.popup_popup_image');
popupWithImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation('.popup_popup_confirmation');

popupConfirmation.setEventListeners();

const createCard = (cardData) => {
  const newCard = new Card (
    cardData,
    handleCardClick,
    (id) => {
      popupConfirmation.open();
      popupConfirmation.setSubmitAction(() => {
        api.deleteCard(id)
          .then((res) => {
            newCard.removeCard();
            popupConfirmation.close();
          })
          .catch((err) => {
            console.log(`${err}`);
          })
      })
    },
    (id) => {
      api.likeCard(id)
        .then((res) => {
          newCard.setLikesInfo(res.likes);
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    },
    (id) => {
      api.dislikeCard(id)
        .then((res) => {
          newCard.setLikesInfo(res.likes);
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    },
    userId,
    '#card-template');

  const cardElement = newCard.generateCard();

  return cardElement;
}

const handleCardClick = (name, link) => {
  popupWithImage.open( name, link );
}

const cardList = new Section({
  renderer: ({ name, link, _id, owner, likes }) => {
    cardList.addItem(createCard({ name, link, _id, owner, likes }), false);
  }
}, '.photo-grid__list');

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__title-subline',
  avatarSelector: '.profile__avatar'
});

const profileFormUser = new PopupWithForm({
  handleFormSubmit: ({ inputName, inputJob}) => {

    renderLoading(true);

    api.updateUserInfo({ name: inputName, about: inputJob })
      .then((res) => {
        userInfo.setUserInfo({ inputName: res.name, inputJob: res.about, inputAvatarHref: res.avatar });
      })
      .then(() => {
        profileFormUser.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        renderLoading(false);
      })
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

    renderLoading(true);

    api.createNewCard({ name: inputTitle, link: inputHref })
      .then((res) => {
        cardList.addItem(createCard({ name: res.name, link: res.link, _id: res._id, owner: res.owner, likes: res.likes }), true);
      })
      .then(() => {
        cardFormUser.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        renderLoading(false);
      })
  }
}, '.popup_popup_cards');

cardFormUser.setEventListeners();

buttonOpenCardPopup.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  cardFormUser.open();
});

const api = new Api('https://mesto.nomoreparties.co/v1/', 'a85b9a75-4425-400b-b52a-bf2c9d807fec', 'cohort-66');

api.getAppInfo()
  .then((argument) => {
    console.log(argument);
    const [ dataFromFirstPromise, dataFromSecondPromise ] = argument;
    userId = dataFromFirstPromise._id;
    userInfo.setUserInfo({ inputName: dataFromFirstPromise.name, inputJob: dataFromFirstPromise.about, inputAvatarHref: dataFromFirstPromise.avatar });
    cardList.renderItems(dataFromSecondPromise);
  })
  .catch((err) => {
    console.log(`${err}`);
  })

//обновление аватара профиля

const popupUpdateAvatar = new PopupWithForm({
  handleFormSubmit: ({ inputAvatarHref }) => {

    renderLoading(true);

    api.updateAvatar({ avatar: inputAvatarHref })
      .then((res) => {
        userInfo.setUserInfo({ inputName: res.name, inputJob: res.about, inputAvatarHref: res.avatar });
      })
      .then(() => {
        popupUpdateAvatar.close();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
      .finally(() => {
        renderLoading(false);
      })
  }
}, '.popup_popup_update-avatar');

popupUpdateAvatar.setEventListeners();

avatarUpdate.addEventListener('click', () => {
  formValidators['avatar-form'].resetValidation();
  popupUpdateAvatar.open();
})

//Уведомление пользовтеля о процессе загрузки

const renderLoading = (isLoading) =>  {
  if (isLoading) {
    saveButton.value = 'Сохранение...';
  } else {
    saveButton.value = 'Сохранить';
  }
}
