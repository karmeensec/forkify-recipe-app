import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import { MODAL_CLOSE_SECONDS } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {async} from 'regenerator-runtime';  
import paginationView from './views/paginationView.js';

if (module.hot) {
  module.hot.accept();
}


const controlRecipes = async function() {

  try{

    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;

    recipeView.renderSpinner();

    //1. Update resultsView to mark selected search result

    resultsView.update(model.getSearchResultPage());

    //2. Update the bookmarks

    bookmarksView.update(model.state.bookmarks);

    //3. Load the recipe

    await model.loadRecipe(id);
    const {recipe} = model.state;
    

    //4. Render the recipe

    recipeView.render(model.state.recipe);

  }
  catch(err) {

    recipeView.renderError();
    console.error(err);
  }

};

// controlRecipes();
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// const arrHL = ['hashchange', 'load'];


const controlSearchResults = async function() {

  try {

    resultsView.renderSpinner();

    //1. Get search results/query

    const query = searchView.getQuery();
    if (!query) return;

    //2. Load search results

    await model.loadSearchResult(query);

    //3. Render results

    // resultsView.render(model.state.search.results);

    resultsView.render(model.getSearchResultPage());

    //4. Render initial pagination buttons 

    paginationView.render(model.state.search);
    
  }
  catch (err) {
    console.log(err);
  }

}

const controlPagination = function(goToPage) {

  // Render new Results
  resultsView.render(model.getSearchResultPage(goToPage));

  // Render new Pagination Buttons
  paginationView.render(model.state.search);

}


const controlServings = function(newServings) {

  // Update the recipe servings (state)c

  model.updateServings(newServings);

  // Update the recipe view

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}


const controlAddBookmark = function() {

  //1. Add or remove bookmark

  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);

}


const controlBookmarks = function() {

  bookmarksView.render(model.state.bookmarks);

}

const controlAddRecipe = async function(newRecipe) {
  
  try {

      //Show Loading Spinner

      addRecipeView.renderSpinner();

      //Upload new recipe
      await model.uploadRecipe(newRecipe);
      console.log(model.state.recipe);

      //Render new recipe

      recipeView.render(model.state.recipe);

      //Success message

      addRecipeView.renderSuccessMessage();

      //Render Bookmark View

      bookmarksView.render(model.state.bookmarks);

      //Change ID in the URL - History API

      window.history.pushState(null, '', `#${model.state.recipe.id}`);

      //Close the form

      setTimeout(() => {
          addRecipeView.toggleWindows();
      }, MODAL_CLOSE_SECONDS * 1000);

  }
  catch (err) {
    console.error('😒', err);
    addRecipeView.renderError(err.message);
  }

}

const init = function() {

  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHnadlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);

}

init();








