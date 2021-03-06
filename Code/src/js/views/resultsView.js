import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
    _parentElement = document.querySelector('#container');
    _errorMessage = 'No countries were found 😕, please try another search 😀';
    _message = '';

    _generateMarkup() {
        this._parentElement.className = "";
        this._parentElement.classList.add('countriesContainer')
        return this._data.map(result => previewView.render(result, false)).join('');
    }
}

export default new ResultsView();
