import View from './View.js';

class HomeView extends View {
    _parentElement = document.querySelector('.countriesContainer');
    _errorMessage = 'There was a problem, please try again 😕';
    _message = '';

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    };

};

export default new HomeView();
