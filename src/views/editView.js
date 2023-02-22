// FROM CONFIG FILE: All Values can be changed there.
import { BACKDROP, BILL_LIST, EDIT_FORM } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class EditView extends View {
    _parentElement;
    inputForm = EDIT_FORM;
    _billElement = BILL_LIST;

    render(data) {
        if(!data) return
        this.data = data;
        this._parentElement = document.querySelector(`[data-bill_id="${data.id}"]`);
        console.log(this._parentElement);
        const editRow = this._parentElement.querySelector('.edit_row');
        console.log(editRow);
        const markup = this._generateMarkup();
        editRow.innerHTML = markup;
    }

    addHandlerCloseEdit(handler) {
        this._billElement.addEventListener('click', function(e) {
            e.preventDefault();
            const link = e.target.closest('.close_edit');
            if(!link) return
            handler();
        })
    }

    clearEditOption() {
        this._parentElement.querySelector('.edit_row').innerHTML = '';
    }

    _generateMarkup() {
        return `
        <h2>Edit: ${this.data.name}'s Information</h2>
        <form id="modify">
            <input class="text__field" name="title" type="text" placeholder="${this.data.name}" required></input>
            <input class="text__field" name="amount" type="number" placeholder="${this.data.amount}" required></input>
            <input class="text__field" name="dueDate" type="date" required></input>
            <input name="reoccuring" type="checkbox">Reoccuring?</input>
            <button class="btn btn--submit">Submit</button>
        </form>
        <button class="btn close_edit">Close</button>
        `
    }
}

export default new EditView();