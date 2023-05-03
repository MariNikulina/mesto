import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPicture = this._popup.querySelector('.popup__picture');
  }

  open(name, link) {
    this._popupPicture.src = link;
    this._popupPicture.alt = name.slice(0, 1).toUpperCase() + name.slice(1);
    this._popup.querySelector('.popup__title_popup_image').textContent = name.slice(0, 1).toUpperCase() + name.slice(1);
    super.open();
  }
}
