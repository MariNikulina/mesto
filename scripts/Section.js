export default class Section {
  constructor( { items, renderer }, selector ) {
    this._initialCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._initialCards.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(element, addToStart) {
    if (addToStart) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
