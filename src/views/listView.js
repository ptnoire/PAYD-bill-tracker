// FROM CONFIG FILE: All Values can be changed there.
import { INPUT_FORM, BILL_LIST } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class ListView extends View {
    _parentElement = BILL_LIST;
    inputForm = INPUT_FORM;

    // Maybe clean up all this repeated code?

    // Payd Button Handler
    addHandlerPaydButton(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.payd__button')
            if(!link) return
            const target = e.target.closest('.bill__item');
            const dataid = +target.dataset.bill_id;
            handler(dataid);
        })
    }

    // History Button Handler
    addHandlerHistoryButton(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.history__button');
            if(!link) return
            const target = e.target.closest('.bill__item');
            const dataid = +target.dataset.bill_id;
            handler(dataid)
        })
    }

    // Edit Button Handler
    addHandlerEditButton(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.modify_button');
            if(!link) return
            const target = e.target.closest('.bill__item');
            const dataid = +target.dataset.bill_id;
            handler(dataid)
        })
    }

    _generateMarkup() {
        return `
        <li class="bill__item" data-bill_id="${this.data.bill.id}">
            <h1>${this.data.bill.name}</h1>
            <div class="list__div">
                <h3><span class="list__label">Amount Due:</span> ${this.data.bill.amount}</h3>
                <h3><span class="list__label">Due Date:</span> ${this.data.bill.dueDate.year}-${this.data.bill.dueDate.month}-${this.data.bill.dueDate.day}</h3>
                <h3>${this.data.bill.reoccuring ? 'Reoccuring Bill' : ''}</h3>
            </div>
            <div class="bill__button-row">
                <button class="btn payd__button">Payd!</button>
                <button class="btn history__button">View History</button>
                <button class="btn modify_button">Edit Bill</button>
            </div>
            <div class="edit_row">

            </div>
        </li>
        `
    }

    // If we are running logic on a bill, we will update the DOM instead of re-rendering the entire list.
    _refreshMarkup(specificBill) {
        const billElement = document.querySelector(`[data-bill_id="${specificBill.id}"]`);
        billElement.innerHTML = '';
        billElement.innerHTML = `
            <h1>${specificBill.name}</h1>
            <div class="list__div">
                <h3><span class="list__label">Amount Due:</span> ${specificBill.amount}</h3>
                <h3><span class="list__label">Due Date:</span> ${specificBill.dueDate.year}-${specificBill.dueDate.month}-${specificBill.dueDate.day}</h3>
                <h3>${specificBill.reoccuring ? 'Reoccuring Bill' : ''}</h3>
            </div>
            <div class="bill__button-row">
                <button class="btn payd__button">Payd!</button>
                <button class="btn history__button">View History</button>
                <button class="btn modify_button">Edit Bill</button>
            </div>
            <div class="edit_row">

            </div>
        `
    }

    reloadLocalStorage(date, data) {
        this._clear();
        data.bills.forEach(el => {
            // Ok ashamed a bit about this, I don't want to refactor how render works which takes in the master object of state, then pulls from the state.bill object, sue me.

            const objectWorkAround = {bill: {...el}};
            this.render(objectWorkAround)
            this.billLogic(date, data, el);
        });
    }

    sortRender(date, data) {
        this._clear();
        data.forEach(el => {
            const newMarkup = `        
            <li class="bill__item" data-bill_id="${el.id}">
            <h1>${el.name}</h1>
            <div class="list__div">
                <h3><span class="list__label">Amount Due:</span> ${el.amount}</h3>
                <h3><span class="list__label">Due Date:</span> ${el.dueDate.year}-${el.dueDate.month}-${el.dueDate.day}</h3>
                <h3>${el.reoccuring ? 'Reoccuring Bill' : ''}</h3>
            </div>
            <div class="bill__button-row">
                <button class="btn payd__button">Payd!</button>
                <button class="btn history__button">View History</button>
                <button class="btn modify_button">Edit Bill</button>
            </div>
            <div class="edit_row">

            </div>
        </li>`
            this._parentElement.insertAdjacentHTML('beforeend', newMarkup);
            this.billLogic(date, data, el)
        })
    }

    billLogic(date, bill, specificBill) {
        // if specificBill is passed as an argument, it will run the bill logic on a specific bill, otherwise it will process the bill from the model.state.bill (which is just a current addition, before it is pushed into the bills array).

        if(specificBill) this._refreshMarkup(specificBill);
        const elem = document.querySelector(`[data-bill_id="${specificBill ? specificBill.id : bill.bill.id}"]`);
        const btnElement = elem.querySelectorAll('.btn');
        const dueDateExtract = specificBill ? specificBill.dueDate.day : bill.bill.dueDate.day;

        const monthMatch = specificBill ? 
        date.currentDate.month === specificBill.dueDate.month 
        : date.currentDate.month === bill.bill.dueDate.month;

        const yearMatch = specificBill ? 
        date.currentDate.year === specificBill.dueDate.year 
        : date.currentDate.year === bill.bill.dueDate.year;
        
            if (specificBill && specificBill.payd === true) {
                elem.classList.add('payd');
                elem.classList.remove('bill_due');
                btnElement.forEach(el => el.classList.remove('btn-d'));
                btnElement.forEach(el => el.classList.add('btn-p'));
            }

            if (specificBill && specificBill.payd === false) {
                elem.classList.remove('payd');
                elem.classList.remove('bill_due');
                btnElement.forEach(el => el.classList.remove('btn-p'));
                if(date.currentDate.day === +dueDateExtract && monthMatch && yearMatch) {
                    elem.classList.add('bill_due');
                    btnElement.forEach(el => el.classList.add('btn-d'));
                }
            }

            if(!specificBill && date.currentDate.day === +dueDateExtract && monthMatch && yearMatch) {
                elem.classList.add('bill_due');
                btnElement.forEach(el => el.classList.add('btn-d'));
            }
        
    }
}

export default new ListView();