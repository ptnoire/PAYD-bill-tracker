// Everything in Config is designed to be changed based on the usage of this application. Currently it is directly being used through a browser DOM.


// Form Element for Uploading Bill Data:
export const INPUT_FORM = document.getElementById('upload');
export const EDIT_FORM = document.getElementById('edit');

// Elements
export const BILL_SUBMIT_BUTTON = document.querySelector('.btn--submit');
export const BILL_LIST = document.querySelector('.bill__list');
export const CURRENT_DATE_DISPLAY = document.querySelector('.current__date');
export const HISTORY_MODAL = document.querySelector('.history__modal');
export const BACKDROP = document.querySelector('.backdrop');
export const EDIT_MODAL = document.querySelector('.edit__modal');