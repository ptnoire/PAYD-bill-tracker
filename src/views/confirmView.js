// FROM CONFIG FILE: All Values can be changed there.
import { MODAL, BACKDROP } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class ConfirmView extends View {
    _parentElement = MODAL;
    _backdrop = BACKDROP;

    render(data) {
        if(!data) return;
        this.data = data;
        this.backdropClose();
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerDelete(handler, id) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.delete_btn')
            if(!link) return;
            handler(id)
        })
    }

    _generateMarkup() {
        this._clear();
        this.scrollToTop();
        if(this._parentElement.classList.contains('hidden')) this.showModal();
        return `
        <h2>Are you sure you want to delete: ${this.data.name}'s information?</h2>
        <div class="btn_row">
            <button class="btn delete_btn">Delete</button>
            <button class="btn cancel_btn">Cancel</button>
        </div>
        `
    }
}

export default new ConfirmView();