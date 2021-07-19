import { async } from 'regenerator-runtime';
import * as model from './model.js';
import homeView from './views/homeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import countryView from './views/countryView.js';
import regionsView from './views/regionsView.js';
import paginationView from './views/paginationView';

const controlSearchResults = async () => {
    try {
        const query = searchView.getQuery();
        if (!query) return;
        await model.searchCountry(query);
        await model.loadCountryList();
        resultsView.render(model.countryResultsPage('search'));
        paginationView.render(' ');
    } catch (err) {
        resultsView.renderError();
        console.log(err);
    };
};

const controlCountry = async () => {
    try {
        const location = window.location.hash.slice(1, 8);

        if (location === "country") {
            const code = window.location.hash.slice(9);
            await model.loadCountry(code);
            countryView.render(model.state.country);
            paginationView.render(' ');
        };
    } catch (err) {
        countryView.renderError();
        console.log(err);
    };
};

const controlRegions = async () => {
    try {
        const location = window.location.hash;
        if (location === "#regions") {
            await model.loadCountryList();
            regionsView.render(model.state.regions);
            paginationView.render(' ');
        };
    } catch (err) {

    };
};


const controlHome = async () => {
    try {
        const location = window.location.hash;
        if (location === "" || location === "#home") {
            await model.loadCountryList();
            resultsView.render(model.countryResultsPage());
            paginationView.render(model.state.countryList);
        };
    } catch (err) {

    };
};

const controlPagination = function (goToPage) {
    resultsView.render(model.countryResultsPage('', goToPage));
    paginationView.render(model.state.countryList);

};


const init = () => {
    homeView.addHandlerRender(controlHome);
    regionsView.addHandlerRender(controlRegions);
    countryView.addHandlerRender(controlCountry);
    paginationView.addHandlerClick(controlPagination);
    searchView.addHandlerSearch(controlSearchResults);
};
init();
