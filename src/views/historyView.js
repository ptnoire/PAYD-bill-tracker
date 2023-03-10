// FROM CONFIG FILE: All Values can be changed there.
import { BACKDROP, MODAL } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class HistoryView extends View {
    _parentElement = MODAL;
    _backdrop = BACKDROP;

    addHandlerShowModal(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.close_modal');
            if(!link) return
            handler();
        })
        document.addEventListener('keydown', function(e) {
            if(e.key === 'Escape' && !MODAL.classList.contains('hidden')) {
                handler();
            }
        })
    }

    addHistoryBackdropHandler(handler) {
        this._backdrop.addEventListener('click', function(e) {
            handler();
        })
    }

    _generateMarkup() {
        this._clear();
        if(this._parentElement.classList.contains('hidden')) this.showModal();
        return `
        <button class="btn close_modal">Close Window</button>
        <h2>${this.data.name}'s History</h2>
            <ul data-billhistory_id="${this.data.id}">
            ${(this.data.history.length > 0) ? this.data.history.map(el =>
                `
                <li class="bill__item_history" data-history_id="${el.id}"><h3>Amount Paid: ${el.paid} on ${el.date.year} - ${el.date.month} - ${el.date.day} at ${el.date.time}</h3>
                <button class="btn edit__history">Modify</button>
                </li>
                `
            ).join('') : `<h3>This bill has no history yet! 😁</h3>`}
            </ul>
        `
    }
}

export default new HistoryView();