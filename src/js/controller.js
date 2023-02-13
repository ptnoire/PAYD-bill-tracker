import listView from "../views/listView.js";
import dateView from "../views/dateView.js";
import * as model from "./model.js"

// Debugging Purposes
const clearButton = document.querySelector('.clear_local_storage');
clearButton.addEventListener('click', model.clearLocalStorageBills)
//

const addNewBill = async function(formData) {
    await model.loadBill(formData);
    listView.render(model.state);
    listView.billLogic(model.date, model.state);
}


const paydButton = function(id) {
    model.billPaydToggle(id);
    listView.billLogic(model.date, model.state, id);
}


const init = function() {
    listView._addHandlerBillSubmit(addNewBill);
    dateView.render(model.currentDate());
    listView._addHandlerPaydButton(paydButton);
    listView.reloadLocalStorage(model.date, model.state);
}

init();