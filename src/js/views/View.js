export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    console.log(data);
    if (data === ' ') return this._clear();

    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  };

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

};
