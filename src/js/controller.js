import listView from "../views/listView.js";
import { BILL_COST, BILL_DUE_DATE, BILL_LIST, BILL_NAME } from "./config.js";
import { BILL_SUBMIT_BUTTON } from "./config.js";
import * as model from "./model.js"

const currDate = document.querySelector('.current__date');
const updateDate = function() {
    const now = new Date();
    currDate.textContent = now;
}
setInterval(updateDate, 1000);

// DEBUGGIN MODE
model.loadBill('Cell Phone', '200', '2023-02-02');
listView.render(model.state);
//


BILL_SUBMIT_BUTTON.addEventListener('click', function() {
    model.loadBill(BILL_NAME.value, BILL_COST.value, BILL_DUE_DATE.value);
    listView.render(model.state);
})

const init = function() {

}