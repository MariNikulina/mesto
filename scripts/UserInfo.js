export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameUser = document.querySelector(nameSelector);
    this._jobUser = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return { inputName: this._nameUser.textContent, inputJob: this._jobUser.textContent };
  }

  setUserInfo(obj) {
    this._nameUser.textContent = obj.inputName;
    this._jobUser.textContent = obj.inputJob;
  }
}
