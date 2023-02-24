// FROM CONFIG FILE: All Values can be changed there.
import {  } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

// Psuedo Code:
//      copy(JSON.stringify(localStorage)) -> Puts local storage to your clipboard, we can do that and also display this data so it can be copied so the user sees that it is being put on their clipboard.

// const data = JSON.parse(*put the string here*);
// Object.keys(data).forEach(el => localStorage.setItem(el, JSON.stringify(data[el])));

// This may need to go into model but can use this view class to display this.


class ExportView extends View {
    // _parentElement = BILL_LIST;
    // _button = SORT_BUTTON;

    // addHandlerNewBillSubmit(handler) {
    //     this._button.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         handler();
    //     })
    // }

    // _generateMarkup() {
    //     return `
    //     <li class="bill__item" data-bill_id="${this.data.bill.id}">
    //         <h1>${this.data.bill.name}</h1>
    //         <h3>Amount Due: ${this.data.bill.amount}</h3>
    //         <h3>Due Date: ${this.data.bill.dueDate.year}-${this.data.bill.dueDate.month}-${this.data.bill.dueDate.day}</h3>
    //         <h3>${this.data.bill.reoccuring ? 'Reoccuring Bill' : ''}</h3>
    //         <div class="bill__button-row">
    //             <button class="btn payd__button">Payd!</button>
    //             <button class="btn history__button">View History</button>
    //             <button class="btn modify_button">Edit Bill</button>
    //         </div>
    //         <div class="edit_row">

    //         </div>
    //     </li>
    //     `
    }


export default new ExportView();