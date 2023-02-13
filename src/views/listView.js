// FROM CONFIG FILE: All Values can be changed there.
import { INPUT_FORM_DATA, BILL_LIST, BILL_SUBMIT_BUTTON } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class ListView extends View {
    _parentElement = BILL_LIST;

    _addHandlerBillSubmit(handler) {
        // Reminder that click doesn't validate and submit refreshes page..
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

    billPaydFeature(id) {
        const elem = document.querySelector(`[data-bill_id="${id}"]`);
        if(!elem.classList.contains('payd')) {
            elem.classList.add('payd');
        } else {
            elem.classList.remove('payd');
        }
    }

    _generateMarkup() {
        return `
        <li class="bill__item" data-bill_id="${this.data.bill.id}">
            <h1>${this.data.bill.name}</h1>
            <h2>Amount Due: ${this.data.bill.amount}</h2>
            <h3>Due Date: ${this.data.bill.dueDate.year}-${this.data.bill.dueDate.month}-${this.data.bill.dueDate.day}</h3>
            <h3>${this.data.bill.reoccuring ? 'Reoccuring Bill' : ''}</h3>
            <button class="payd__button">Payd!</button>
        </li>
        `
    }

    reloadLocalStorage(date, data) {
        data.bills.forEach(el => {
            // Ok ashamed a bit about this, I don't want to refactor how render works which takes in the master object of state, then pulls from the state.bill object, sue me.

            const objectWorkAround = {bill: {...el}};
            this.render(objectWorkAround)
            this.billLogic(date, data, el.id);
        });

    }

    billLogic(date, bill, iden) {
        // If Iden (Identification Number on Bill) is passed as an argument, then this function will update based off of that number, if not it will take directly from the state object which should be the current bill being taken under. This will allow this function to work logic for updates and additons.

        const index = iden ? bill.bills.findIndex(el => el.id === iden) : 0;

        const elem = document.querySelector(`[data-bill_id="${iden ? bill.bills[index].id : bill.bill.id}"]`);

        // const dueDateExtract = iden ? String(bill.bills[index].dueDate).slice(-2) : String(bill.bill.dueDate).slice(-2);

        const dueDateExtract = iden ? bill.bills[index].dueDate.day : bill.bill.dueDate.day;

            if (bill.bills[index].payd === true) {
                elem.classList.add('payd');
                elem.classList.remove('bill_due');
            }
            if (bill.bills[index].payd === false) {
                elem.classList.remove('payd');
                if(date.currentDate.day === +dueDateExtract) {
                    elem.classList.add('bill_due');
                }
            }
            if(date.currentDate.day === +dueDateExtract) {
                elem.classList.add('bill_due');
            }
    }
}

export default new ListView();