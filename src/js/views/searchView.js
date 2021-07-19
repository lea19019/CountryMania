class SearchView {
    _parentEl = document.querySelector('.search');

    getQuery() {
        const query = this._parentEl.querySelector('.searchInput').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentEl.querySelector('.searchInput').value = '';
    }

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            window.location.hash = 'search'
            handler();
        });
    }
}

export default new SearchView();
