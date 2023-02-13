import listView from "../views/listView.js";
import dateView from "../views/dateView.js";
import * as model from "./model.js"



const addNewBill = async function(formData) {
    await model.loadBill(formData)
    listView.render(model.state);
    model.billLogic(model.state)
}

const paydButton = function(bill) {
    model.billPaydToggle(bill);
    listView.billPaydFeature(bill)
}

const init = function() {
    listView._addHandlerBillSubmit(addNewBill);
    dateView.render(model.currentDate());
    listView._addHandlerPaydButton(paydButton);
}

init();