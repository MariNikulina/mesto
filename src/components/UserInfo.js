export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameUser = document.querySelector(nameSelector);
    this._jobUser = document.querySelector(jobSelector);
    this._avatarUser = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { inputName: this._nameUser.textContent, inputJob: this._jobUser.textContent };
  }

  setUserInfo(obj) {
    this._nameUser.textContent = obj.inputName;
    this._jobUser.textContent = obj.inputJob;
    this._avatarUser.src = obj.inputAvatarHref;
  }
}
