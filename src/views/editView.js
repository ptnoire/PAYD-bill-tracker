// FROM CONFIG FILE: All Values can be changed there.
import { BILL_LIST, EDIT_FORM, MODAL, BILL_FORM_BOX } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class EditView extends View {
    _parentElement = BILL_FORM_BOX;
    _inputForm = EDIT_FORM;
    _billElement = BILL_LIST;


    addHandlerShowModal(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.cancel_btn');
            if(!link) return
            handler();
        })
        document.addEventListener('keydown', function(e) {
            if(e.key === 'Escape' && !MODAL.classList.contains('hidden')) {
                handler();
            }
        })
    }

    addEditBackdropHandler(handler) {
        this._backdrop.addEventListener('click', function(e) {
            handler();
        })
    }

    showModal() {
        this._parentElement.classList.toggle('hidden');
    }

    _generateMarkup() {
        this._clear();
        this.scrollToTop();
        this.showModal();
        return `
        <h2>Edit: ${this.data.name}'s Information</h2>
        <form id="modify">
        <input class="text__field" name="title" type="text" placeholder="${this.data.name}" required></input>
        <input class="text__field" name="amount" type="number" placeholder="${this.data.amount}" required></input>
        <input class="text__field" name="dueDate" type="date" required></input>
        <input name="reoccuring" type="checkbox">Reoccuring?</input>
        <button class="btn btn--submit">Submit</button>
        </form>
        <button class="btn cancel_btn">Cancel</button>
        `
    }
}

export default new EditView();