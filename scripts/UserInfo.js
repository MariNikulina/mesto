export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameUser = document.querySelector(nameSelector);
    this._jobUser = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return { nameUser: this._nameUser.textContent, jobUser: this._jobUser.textContent };
  }

  setUserInfo(obj) {
    this._nameUser.textContent = obj[nameInfo];
    this._jobUser.textContent = obj[jobInfo];
  }
}
