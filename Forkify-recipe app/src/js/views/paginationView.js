import View from "./View.js";

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {

    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {

        this._parentElement.addEventListener('click', function(e) {

            const btn = e.target.closest('.btn--inline');

            if(!btn) return;

            const goToPage = +btn.dataset.goto;

            handler(goToPage);

        })

    }

    _generateMarkup() {

        const currentPage = this._data.page;

        const numberPages = Math.ceil(this._data.results.length / this._data.resultsPerPage); 

        // Page 1 && other pages

        if (currentPage === 1 && numberPages > 1) {
            return this._generateMarkupButtonNext(currentPage);
        }

        // Last page

        if (currentPage === numberPages) {
            return this._generateMarkupButtonPrev(currentPage);
        }


        // Other pages

        if (currentPage < numberPages && numberPages > 1) {
            
            return this._generateMarkupButtonPrev(currentPage) + this._generateMarkupButtonNext(currentPage);
            

        }

        // Page 1 && no other pages
            return '';
    }

    _generateMarkupButtonPrev(currentPage) {

        return `
            
                <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">

                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>

                    <span>Page ${currentPage - 1}</span>
                </button>

            `

    }

    _generateMarkupButtonNext(currentPage) {

        return `
            
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">

            <span>Page ${currentPage + 1}</span>

            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>

        </button>

    `

    }

}

export default new PaginationView();