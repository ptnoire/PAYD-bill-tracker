// FROM CONFIG FILE: All Values can be changed there.
import { MODAL, BACKDROP } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class ConfirmView extends View {
    _parentElement = MODAL;
    _backdrop = BACKDROP;
    _deleteButton;

    render(data) {
        if(!data) return;
        this.data = data;
        this.backdropClose();
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerDelete(handler, id, historyId) {
        this._deleteButton = this._parentElement.querySelector('.delete_btn');
        this._deleteButton.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.delete_btn')
            if(!link) return;
            handler(id, historyId)
        })
    }

    _generateMarkup() {
        this._clear();
        if(this._parentElement.classList.contains('hidden')) this.showModal();
        return `
        <h3 class="confirm_h3">Are you sure you want to delete</h3>
        <h2 class="confirm_h2">${this.data.name ? this.data.name : this.data.title}'s information?</h2>
        <div class="btn_confirm">
            <button class="btn delete_btn">Delete</button>
            <button class="btn cancel_btn">Cancel</button>
        </div>
        `
    }
}

export default new ConfirmView();