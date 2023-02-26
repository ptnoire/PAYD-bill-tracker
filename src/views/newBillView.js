// FROM CONFIG FILE: All Values can be changed there.
import { BILL_LIST, INPUT_FORM, BILL_FORM_BOX, BILL_SUBMIT_BUTTON, MAIN_NAVIGATION } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class NewBillView extends View {
    _nav = MAIN_NAVIGATION;
    _button = BILL_SUBMIT_BUTTON;
    _parentElement = BILL_FORM_BOX;
    inputForm = INPUT_FORM;
    _billElement = BILL_LIST;

    render() {
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        this.inputForm = this._parentElement.querySelector('.upload');
    }

    addHandlerNewBillModal(handler) {
        this._button.addEventListener('click', function(e) {
            e.preventDefault();
            handler();
        })
    }

    _generateMarkup() {
        this._clear();
        this.scrollToTop();
        if(this._parentElement.classList.contains('hidden')) this.showModal();
        return `
        <h2>Submit New Bill</h2>
        <form class="upload" id="upload">
            <input class="text__field" id="title" name="title" type="text" placeholder="Insert Bill Name Here" required></input>
            <input class="text__field" id="amount"  name="amount" type="number" placeholder="Insert Cost of Bill Here" required></input>
            <input class="text__field dateBox" id="date"  name="dueDate" type="date" required></input>
            <input id="reoccuring" name="reoccuring" type="checkbox" checked="checked">Reoccuring?</input>
            <button class="btn btn-p btn--submit">Submit</button>
        </form>
        <div class="btn_row">
            <button class="btn btn-p cancel_btn">Cancel</button>
        </div>
        `
    }
}

export default new NewBillView();