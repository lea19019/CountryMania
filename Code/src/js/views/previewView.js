import View from './View.js';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
      <li class="countryPreview">
        <a href="#country/${this._data.code}">
          <figure class="countryFlag">
            <img src="${this._data.flag}" alt="${this._data.name}" />
          </figure>
            <h3 class="countryName">${this._data.name}</h3>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
