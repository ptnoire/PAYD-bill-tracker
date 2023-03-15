// FROM CONFIG FILE: All Values can be changed there.
import { BILL_LIST, BILL_FORM_BOX, INPUT_FORM } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class EditView extends View {
    _parentElement = BILL_FORM_BOX;
    inputForm = INPUT_FORM;
    _billElement = BILL_LIST;
    _deleteButton;

    render(data) {
        if(!data) return;
        this.data = data;
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        this.inputForm = this._parentElement.querySelector('.upload');
    }

    _generateMarkup() {
        this._clear();
        this.scrollToTop();
        if(this._parentElement.classList.contains('hidden')) this.showModal();
        return `
        <h2>Edit: ${this.data.name}'s Information</h2>
        <form class="upload" id="modify">
            <input class="text__field" name="title" type="text" placeholder="${this.data.name}"></input>
            <input class="text__field" name="amount" type="number" step="0.01" placeholder="${this.data.amount}"></input>
            <input class="text__field dateBox" name="dueDate" type="date"></input>
            <input name="reoccuring" type="checkbox" ${this.data.reoccuring ? `checked="${this.data.reoccuring}"` : ""}>Reoccuring?</input>
            <button class="btn btn-p btn--submit">Submit</button>
        </form>
        <div class="btn_row">
            <button class="btn btn-p delete_btn">Delete</button>
            <button class="btn btn-p cancel_btn">Cancel</button>
        </div>
        `
    }
}

export default new EditView();