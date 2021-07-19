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
    },
    regions: {}
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

const createRegionList = (data) => {
    const regions = {
        Africa: [],
        Americas: [],
        Asia: [],
        Europe: [],
        Oceania: [],
        Polar: [],
        Other: []
    };
    data.map(country => {
        if (country.region in regions) {
            regions[country.region].push({
                code: country.alpha3Code,
                name: country.name
            });
        } else {
            regions.Other.push({
                code: country.alpha3Code,
                name: country.name
            });
        }
    });

    return regions;
};

export const loadCountryList = async () => {
    try {
        const countries = await AJAX(`${API_URL}all`);
        state.countryList.results = createCountryList(countries);
        state.regions = createRegionList(countries);
    } catch (err) {
        throw err;
    };
};

export const loadCountry = async (code) => {
    try {
        const countryData = await AJAX(`${API_URL}alpha/${code}`);
        state.country = createCountry(countryData);
    } catch (err) {
        throw err;
    };
};

export const countryResultsPage = function (view = '', page = state.countryList.page) {
    state.countryList.page = page;

    const start = (page - 1) * state.countryList.resultsPerPage;
    const end = page * state.countryList.resultsPerPage;

    if (view === 'search') {
        return state.search.results;
    };

    return state.countryList.results.slice(start, end);

};

export const searchCountry = async (query) => {
    try {
        const result = await AJAX(`${API_URL}name/${query}`);
        state.search.results = createCountryList(result);
    } catch (err) {
        throw err;
    };
};