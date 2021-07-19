import View from "./View";

class RegionsView extends View {
    _parentElement = document.querySelector('.container');
    _errorMessage = 'We could not find that recipe. Please try another one!';
    _message = '';

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    };

    _generateMarkup() {
        let regionsView = ""
        Object.entries(this._data).forEach(([region, countries]) => {
            regionsView += this._generateRegionMarkup(region, countries);
        });
        return `<div>
        ${regionsView}
        </div>`;
    }

    _generateRegionMarkup(region, countries) {
        return `
        <h2>${region}</h2>
        <ul>
            ${countries.map(this._generataCountryMarkup).join('')}
        </ul>`;
    }

    _generataCountryMarkup(country) {
        return `<li><a href="#country/${country.code}">${country.name}</a></li>`
    };

};

export default new RegionsView();