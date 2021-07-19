import View from './View.js';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview">
        <a href="#country/${this._data.code}">
          <figure class="preview__fig">
            <img src="${this._data.flag}" alt="${this._data.name}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.name}</h4>

          </div>
        </a>
      </li>
    `;
  }
}

export default new PreviewView();
