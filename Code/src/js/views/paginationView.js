import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  };

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>${curPage + 1}</span>
        </button>
        <button data-goto="${numPages}" class="btn--inline pagination__btn--prev">
          <span>${numPages}</span>
        </button>
        `;
    };

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${1}" class="btn--inline pagination__btn--prev">
          <span>${1}</span>
        </button>
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <span>${curPage - 1}</span>
        </button>
        `;
    };

    // Page 2
    if (curPage === 2) {
      return `
      <button data-goto="${1}" class="btn--inline pagination__btn--prev">
          <span>${1}</span>
        </button>
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>${curPage + 1}</span>
        </button>
        <button data-goto="${numPages}" class="btn--inline pagination__btn--prev">
          <span>${numPages}</span>
        </button>
      `;
    };

    // Second to last
    if (curPage === 7) {
      return `
      <button data-goto="${1}" class="btn--inline pagination__btn--prev">
          <span>${1}</span>
        </button>
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--next">
          <span>${curPage - 1}</span>
        </button>
        <button data-goto="${numPages}" class="btn--inline pagination__btn--prev">
          <span>${numPages}</span>
        </button>
      `;
    };

    // Other page
    if (curPage > 2 && curPage < numPages) {
      return `
      <button data-goto="${1}" class="btn--inline pagination__btn--prev">
          <span>${1}</span>
        </button>
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <span>${curPage - 1}</span>
        </button>
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>${curPage + 1}</span>
        </button>
        <button data-goto="${numPages}" class="btn--inline pagination__btn--prev">
          <span>${numPages}</span>
        </button>
      `;
    };



    // Page 1, and there are NO other pages
    return '';
  };
};

export default new PaginationView();
