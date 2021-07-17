import { API_URL, COUNTRY_PER_PAGE, REGIONS } from "./config";
import { async } from 'regenerator-runtime';
import { AJAX } from "./helper";

export const state = {
    country: {},
    search: {
        query: '',
        results: [],
    },
    countryList: {
        results: [],
        page: 1,
        resultsPerPage: COUNTRY_PER_PAGE
    }
};

const createCountry = (country) => {
    return {
        name: country.name,
        code: country.alpha3Code,
        capital: country.capital,
        officialName: country.altSpellings,
        region: country.region,
        subregion: country.subregion,
        population: country.population,
        demonym: country.demonym,
        area: country.area,
        timezones: country.timezones,
        borders: country.borders,
        nativeName: country.nativeName,
        currencies: country.currencies,
        languages: country.languages,
        translations: country.translations,
        flag: country.flag
    };
};

const createCountryList = (data) => {
    const randomNum = new Set();
    while (randomNum.size < data.length) {
        let rand = Math.floor(Math.random() * data.length);
        randomNum.add(rand);
    }
    const randomList = Array.from(randomNum);

    const countryList = [];
    for (let i = 0; i < randomList.length; i++) {
        const countryData = {
            name: data[randomList[i]].name,
            flag: data[randomList[i]].flag,
            code: data[randomList[i]].alpha3Code
        };
        countryList.push(countryData);
    };

    return countryList;
};

export const loadCountryList = async () => {
    try {
        const countriesData = await AJAX(`${API_URL}all`);
        const countries = createCountryList(countriesData);
        state.countryList.results = countries;
    } catch (err) {
        throw err;
    };
};

export const loadCountry = async (code) => {
    try {
        const countryData = await AJAX(`${API_URL}alpha/${code}`);
        const country = createCountry(countryData);
        state.country = country;
    } catch (err) {
        throw err;
    };
};

export const countryResultsPage = function (page = state.countryList.page) {
    state.countryList.page = page;

    const start = (page - 1) * state.countryList.resultsPerPage;
    const end = page * state.countryList.resultsPerPage;
    const countryResults = state.countryList.results.slice(start, end);

    return countryResults;
};

export const searchCountry = async (query) => {
    try {
        const result = await AJAX(`${API_URL}name/${query}`);
        state.search.results = createCountryList(result);
    } catch (err) {
        throw err;
    };
};

export const countryResultsRegion = async (region) => {
    try {
        const regions = await AJAX(`${API_URL}region/${region}`);
        console.log(regions);
    } catch (err) {

    }
};