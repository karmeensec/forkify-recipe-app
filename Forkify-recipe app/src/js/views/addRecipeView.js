import View from "./View.js";
import previewView from "./previewView.js";

import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {    

    _parentElement = document.querySelector('.upload');
    _recipeWindow = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');
    _successMessage = 'Recipe added successfully';

    constructor() {
        super();
        this._addHandlerShowWindow(); 
        this._addHandlerHideWindows();
    }

    toggleWindows() {
        this._overlay.classList.toggle('hidden');
        this._recipeWindow.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {

        this._btnOpen.addEventListener('click', this.toggleWindows.bind(this));

    }

    _addHandlerHideWindows() {

        this._btnClose.addEventListener('click', this.toggleWindows.bind(this));
        this._overlay.addEventListener('click', this.toggleWindows.bind(this));

    }

    addHandlerUpload(handler) {

        this._parentElement.addEventListener('submit', function(e) {

            e.preventDefault();
            const dataArray = [...new FormData(this)];
            const data = Object.fromEntries(dataArray);
            handler(data);

        })

    }

    _generateMarkup() {

        
    }

}

export default new AddRecipeView();