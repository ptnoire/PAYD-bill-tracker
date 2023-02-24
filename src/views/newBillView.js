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
    }

    addHandlerNewBillModal(handler) {
        this._button.addEventListener('click', function(e) {
            e.preventDefault();
            handler();
        })
    }

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
        <h2>Submit New Bill</h2>
        <p>BUG FIX: Whenever you regenerate this form, the new submit button loses the event listener and it refreshes the page. You gotta reset that everytime you generate this markup.</p>
        <form id="upload">
            <input class="text__field" id="title" name="title" type="text" placeholder="Insert Bill Name Here" required></input>
            <input class="text__field" id="amount"  name="amount" type="number" placeholder="Insert Cost of Bill Here" required></input>
            <input class="text__field" id="date"  name="dueDate" type="date" required></input>
            <input id="reoccuring" name="reoccuring" type="checkbox" checked="checked">Reoccuring?</input>
            <button class="btn btn--submit">Submit</button>
        </form>
        <button class="btn cancel_btn">Cancel</button>
        `
    }
}

export default new NewBillView();