// FROM CONFIG FILE: All Values can be changed there.
import { BILL_LIST, MODAL, BILL_FORM_BOX, INPUT_FORM } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class EditView extends View {
    _parentElement = BILL_FORM_BOX;
    inputForm = INPUT_FORM;
    _billElement = BILL_LIST;


    addHandlerShowModal(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const link = e.target.closest('.cancel_btn');
            if(!link) return
            handler();
        })
    }

    _generateMarkup() {
        this._clear();
        this.scrollToTop();
        if(this._parentElement.classList.contains('hidden')) this.showModal();
        return `
        <h2>Edit: ${this.data.name}'s Information</h2>
        <p>BUG FIX: Whenever you regenerate this form, the new submit button loses the event listener and it refreshes the page. You gotta reset that everytime you generate this markup.</p>
        <form id="modify">
            <input class="text__field" name="title" type="text" placeholder="${this.data.name}" required></input>
            <input class="text__field" name="amount" type="number" placeholder="${this.data.amount}" required></input>
            <input class="text__field" name="dueDate" type="date" required></input>
            <input name="reoccuring" type="checkbox" value="true">Reoccuring?</input>
            <button class="btn btn--submit">Submit</button>
        </form>
        <button class="btn cancel_btn">Cancel</button>
        `
    }
}

export default new EditView();