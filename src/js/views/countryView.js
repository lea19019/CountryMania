import View from './View.js';

class CountryView extends View {
  _parentElement = document.querySelector('.countryContainer');
  _errorMessage = 'There was a problem, please try again 😕';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    const translations = Object.entries(this._data.translations);

    return `
      <div class="country">
        <div class="countryIntro">
            <div class="countryData">
                <h2>${this._data.name}</h2>
                <hr>
                <h3>${this._data.nativeName}</h3><span>Native Name</span>
                <h3>${this._data.capital}</h3><span>Capital</span>

            </div>
            <figure>
                <img src="${this._data.flag}" alt="${this._data.name}" />
            </figure>
        </div>
        <div class="countryInfo">
            <h3>Fun facts!</h3>
            <hr>
            <p>${this._data.name} is over ${this._data.area} square km!!! 🤯</p>
            <p>${this._data.name} has a population of ${this._data.population} people 👨‍👩‍👧‍👦</p>
            <p>Their demonym is ${this._data.demonym} 🤠</p>
            <p>${this._data.name} is inside the continent ${this._data.region} and if we want to be picky is inside the ${this._data.subregion} region 🌏</p>
            <p>${this._data.timezones.map(this._generateArrayMarkup).join(', ')} 
            ${this._data.timezones.length > 1 ? 'are the timezones' : 'is the timezone'} of this country ⌚</p>
            <p>${this._data.name} shares ${this._data.borders.length > 1 ? 'borders' : 'border'} with ${this._data.borders.map(this._generateBordersMarkup).join(', ')}</p>
            
            <p>People in ${this._data.name} speak ${this._data.languages.map(this._generateObjectMarkup).join(', ')}</p>
            <p>These are recognized as their official names: ${this._data.officialName.map(this._generateArrayMarkup).join(', ')} </p>
            <p>This is the way people call ${this._data.name} in other languages</p>
            <ul>
                ${translations.map(this._generateTranslationMarkup).join('')}
            </ul>
            <p>In ${this._data.name}  people pay their bills 💸💰 with: </p>
            <ul>
                ${this._data.currencies.map(this._generateObjectMarkup).join('')}
            </ul>
        </div>
    </div>
    `;
  }

  _generateArrayMarkup(value) {
    return `<span>${value}</span>`
  };

  _generateObjectMarkup(dataObj) {
    if ('nativeName' in dataObj) {
      return `<span>${dataObj.nativeName} (${dataObj.name})</span>`;
    } else {
      return `<li>
    <p>${dataObj.name}, its code is ${dataObj.code} and the symbol is ${dataObj.symbol}</p>
    </li>`;
    };
  };

  _generateBordersMarkup(country) {
    return `<span><a href="#country/${country}">${country}</a><span>`
  };

  _generateTranslationMarkup(translations) {
    const languages = {
      br: "Portuguese (Brazil)",
      de: "German",
      es: "Spanish",
      fa: "Farsi",
      fr: "French",
      hr: "Croatian",
      it: "Italian",
      ja: "Japanese",
      nl: "Dutch",
      pt: "Portuguese (Portugal)"
    };

    return `<li>
    <p>${translations[1]} in ${languages[translations[0]]} </p>
    </li>`
  };

};

export default new CountryView();
