import * as model from './model.js';


const fun = async (code) => {
    await model.loadCountry(code);
    await model.loadCountryList();
    await model.searchCountry("us");
    await model.countryResultsPage(3);
    await model.countryResultsRegion('europe');
    console.log(model.state);
};





fun('MEX');