import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButtonNext(curPage, numPages);
    }
    //last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButtonPrev(curPage, numPages);
    }
    //other page
    if (curPage < numPages && curPage !== 1) {
      const markup =
        this._generateMarkupButtonNext(curPage, numPages) +
        this._generateMarkupButtonPrev(curPage, numPages);
      return markup;
    }
    //page 1, and no other pages
    return '';
  }

  _generateMarkupButtonNext(curPage, numPages) {
    return `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
            <span>page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  _generateMarkupButtonPrev(curPage, numPages) {
    return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
            </button>
          `;
  }
}
export default new PaginationView();
