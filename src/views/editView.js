// FROM CONFIG FILE: All Values can be changed there.
import { BILL_LIST, BILL_FORM_BOX, INPUT_FORM } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class EditView extends View {
    _parentElement = BILL_FORM_BOX;
    inputForm = INPUT_FORM;
    _billElement = BILL_LIST;

    render(data) {
        if(!data) return;
        this.data = data;
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        this.inputForm = this._parentElement.querySelector('.upload');
    }

    addHandlerDelete(handler, id) {
        console.log(this._parentElement);
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
        <h2>Edit: ${this.data.name}'s Information</h2>
        <form class="upload" id="modify">
            <input class="text__field" name="title" type="text" placeholder="${this.data.name}"></input>
            <input class="text__field" name="amount" type="number" placeholder="${this.data.amount}"></input>
            <input class="text__field" name="dueDate" type="date"></input>
            <input name="reoccuring" type="checkbox" ${this.data.reoccuring ? `value="${this.data.reoccuring}"` : ""}>Reoccuring?</input>
            <button class="btn btn--submit">Submit</button>
        </form>
        <div class="btn_row">
            <button class="btn delete_btn">Delete</button>
            <button class="btn cancel_btn">Cancel</button>
        </div>
        `
    }
}

export default new EditView();