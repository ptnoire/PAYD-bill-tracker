// Everything in Config is designed to be changed based on the usage of this application. Currently it is directly being used through a browser DOM.


// Form Element for Uploading Bill Data:
export const INPUT_FORM = document.getElementById('upload');

// Elements
export const TOP_OF_PAGE = document.querySelector('.topNav');
export const MAIN_NAVIGATION = document.querySelector('.main_buttons');
export const BILL_FORM_BOX = document.querySelector('.input__bills');
export const BILL_LIST = document.querySelector('.bill__list');
export const CURRENT_DATE_DISPLAY = document.querySelector('.current__date');
export const MODAL = document.querySelector('.modal');
export const BACKDROP = document.querySelector('.backdrop');

// Buttons
export const BILL_SUBMIT_BUTTON = document.querySelector('.btn--submit');
export const SORT_BUTTON = document.querySelector('.btn-sort');