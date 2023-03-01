// FROM CONFIG FILE: All Values can be changed there.
import { BACKDROP, MODAL } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class HistoryEditView extends View {
    _parentElement = MODAL;
    _childElement;
    _backdrop = BACKDROP;
    _deleteButton;
    _cancelButton;

    render(data) {
        this.data = data;
        this._childElement = document.querySelector(`[data-history_id="${this.data.id}"]`);
        this._childElement.insertAdjacentHTML('afterbegin', this._generateMarkup());
    }

    // Finding the specific item in the history list.
    addHandlerHistoryEditButton(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.edit__history')
            if(!link) return
            const target = e.target.closest('.bill__item_history');
            const dataid = +target.dataset.history_id;
            const masterBill = e.target.closest('ul')
            const billid = +masterBill.dataset.billhistory_id;
            handler(billid, dataid);
        })
    }

    // Editting the specific history item in the list.
    addHandlerEditHistoryItem(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.btn--submit')
            if(!link) return
            const target = e.target.closest('.bill__item_history');
            const dataid = +target.dataset.history_id;
            const masterBill = e.target.closest('ul')
            const billid = +masterBill.dataset.billhistory_id;
            const newInput = target.querySelector('.text__field').value;
            handler(billid, dataid, newInput);
        })
    }

    addHandlerShowModal(handler) {
        this._cancelButton = this._parentElement.querySelector('.cancel_btn');
        this._cancelButton.addEventListener('click', function(e) {
            const target = e.target.closest('.bill__item_history');
            const dataid = +target.dataset.history_id;
            const masterBill = e.target.closest('ul')
            const billid = +masterBill.dataset.billhistory_id;
            handler(billid, dataid);
        })
    }

    _clear() {
        this._childElement.innerHTML = '';
    }

    _generateMarkup() {
        this._clear();
        return `
        <h2>Editting: ${this.data.title}'s History for ${this.data.date.year}-${this.data.date.month}-${this.data.date.day}</h2>
        <form id="upload">
            <input class="text__field" id="amount"  name="amount" type="number" placeholder="Amount Paid: ${this.data.paid}" required></input>
            <button class="btn btn--submit">Submit</button>
            <button class="btn delete_btn">Delete Entry</button>
        </form>
        <button class="btn cancel_btn">Cancel</button>
        `
    }
}

export default new HistoryEditView();