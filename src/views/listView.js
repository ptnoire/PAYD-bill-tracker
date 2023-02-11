// FROM CONFIG FILE: All Values can be changed there.
import { INPUT_FORM_DATA, BILL_LIST, BILL_SUBMIT_BUTTON } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "../js/view.js";

class ListView extends View {
    _parentElement = BILL_LIST;
    _paydButton = this._parentElement.querySelector('.payd__button');

    _addHandlerBillSubmit(handler) {
        BILL_SUBMIT_BUTTON.addEventListener('click', function(e) {
            e.preventDefault();
            const dataArr = new FormData(INPUT_FORM_DATA);
            const data = Object.fromEntries(dataArr)
            handler(data);
        })
    }

    _addHandlerPaydButton(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.payd__button')
            if(!link) return
            const target = e.target.closest('.bill__item');
            const dataid = +target.dataset.bill_id;
            handler(dataid);
        })
    }

    _generateMarkup(data) {
        console.log(data);
        return `
        <li class="bill__item" data-bill_id="${data.bill.id}">
            <h1>${data.bill.name}</h1>
            <h2>Amount Due: ${data.bill.amount}</h2>
            <h3>Due Date: ${data.bill.dueDate}</h3>
            <h3>${data.bill.reoccuring ? 'Reoccuring Bill' : ''}</h3>
            <button class="payd__button">Payd!</button>
        </li>
        `
    }
}

export default new ListView();