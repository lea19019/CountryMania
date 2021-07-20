import View from "./View";

class RegionsView extends View {
    _parentElement = document.querySelector('.regionsContainer');
    _errorMessage = 'There was a problem, please try again 😕';
    _message = '';

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    };

    _generateMarkup() {
        let regionsView = ""
        Object.entries(this._data).forEach(([region, countries]) => {
            regionsView += this._generateRegionMarkup(region, countries);
        });
        return `
        ${regionsView}
        `;
    }

    _generateRegionMarkup(region, countries) {
        return `<div class="region">
        <h2>${region}</h2>
        <hr>
        <ul>
            ${countries.map(this._generataCountryMarkup).join('')}
        </ul>
        </div>`;
    }

    _generataCountryMarkup(country) {
        return `<li><a href="#country/${country.code}">${country.name}</a></li>`
    };

};

export default new RegionsView();