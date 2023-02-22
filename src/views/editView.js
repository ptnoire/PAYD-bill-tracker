// FROM CONFIG FILE: All Values can be changed there.
import { BACKDROP, EDIT_MODAL, EDIT_FORM } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class EditView extends View {
    _parentElement = EDIT_MODAL;
    inputForm = EDIT_FORM;
    _backdrop = BACKDROP;

    addHandlerShowModal(handler) {
        this._parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.close_modal');
            if(!link) return
            handler();
        })
        document.addEventListener('keydown', function(e) {
            if(e.key === 'Escape' && !EDIT_MODAL.classList.contains('hidden')) {
                handler();
            }
        })
    }

    addEditBackdropHandler(handler) {
        this._backdrop.addEventListener('click', function(e) {
            handler();
        })
    }

    _generateMarkup() {
        this._clear();
        this.showModal();
        return `
        <h2>Edit: ${this.data.name}'s Information</h2>
        <button class="btn close_modal">&times;</button>
        <form id="edit">
            <input  name="title" type="text" placeholder="${this.data.name}" required></input><br>
            <input name="amount" type="number" placeholder="${this.data.amount}" required></input><br>
            <input name="dueDate" type="date" required></input>
            <input name="reoccuring" type="checkbox">Reoccuring?</input><br>
            <button class="btn btn--submit">Submit</button>
        </form>
        <h2>Current Information:</h2>
        <p>Title: ${this.data.name}</p>
        <p>Amount Due: ${this.data.amount}</p>
        <p>Due Date: ${this.data.dueDate.year} - ${this.data.dueDate.month} - ${this.data.dueDate.day}</p>
        <p>Reoccuring: ${this.data.reoccuring ? 'Every Month' : 'One Time Bill'}</p>
        `
    }
}

export default new EditView();