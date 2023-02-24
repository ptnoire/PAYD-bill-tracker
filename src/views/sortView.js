// FROM CONFIG FILE: All Values can be changed there.
import { BILL_LIST, SORT_BUTTON } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class SortView extends View {
    _parentElement = BILL_LIST;
    _button = SORT_BUTTON;

    addHandlerNewBillSubmit(handler) {
        this._button.addEventListener('click', function(e) {
            e.preventDefault();
            handler();
        })
    }

    // Something like this
    // const movs = sort ? 
    // movements.slice().sort((a, b) => a - b) : movements;

    // const displayMovements = function(movements, sort = false) {
    //     containerMovements.innerHTML = '';
      
    //     const movs = sort ? 
    //     movements.slice().sort((a, b) => a - b) : movements;
      
    //     movs.forEach(function(mov, i){
    //       const type = mov > 0 ? 'deposit' : 'withdrawal'
    //       const html = `
    //       <div class="movements__row">
    //         <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    //         <div class="movements__value">${mov} €</div>
    //       </div>`
    //       containerMovements.insertAdjacentHTML('afterbegin', html);
    //     })
    //   }


    _generateMarkup() {
        this._clear();
        this.scrollToTop();
        this.showModal();
        return `
        <li class="bill__item" data-bill_id="${this.data.bill.id}">
            <h1>${this.data.bill.name}</h1>
            <h3>Amount Due: ${this.data.bill.amount}</h3>
            <h3>Due Date: ${this.data.bill.dueDate.year}-${this.data.bill.dueDate.month}-${this.data.bill.dueDate.day}</h3>
            <h3>${this.data.bill.reoccuring ? 'Reoccuring Bill' : ''}</h3>
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
}

export default new SortView();