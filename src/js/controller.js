import listView from "../views/listView.js";
// import { BILL_COST, BILL_DUE_DATE, BILL_LIST, BILL_NAME } from "./config.js";
import { BILL_SUBMIT_BUTTON } from "./config.js";
import * as model from "./model.js"

const currDate = document.querySelector('.current__date');
const updateDate = function() {
    const now = new Date();
    currDate.textContent = now;
}
updateDate();


const addNewBill = async function(formData) {
    await model.loadBill(formData)
    listView.render(model.state);
}


const init = function() {
    listView._addHandlerBillSubmit(addNewBill);
}

init();