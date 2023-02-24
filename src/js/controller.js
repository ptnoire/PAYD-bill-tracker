import listView from "../views/listView.js";
import dateView from "../views/dateView.js";
import historyView from "../views/historyView.js";
import editView from "../views/editView.js";
import newBillView from "../views/newBillView.js";
import * as model from "./model.js"

// Debugging Purposes
const clearButton = document.querySelector('.clear_local_storage');
clearButton.addEventListener('click', model.clearLocalStorageBills)
//

const addNewBill = function(formData) {
    model.loadBill(formData);
    listView.render(model.state);
    listView.billLogic(model.date, model.state);
    newBillView.showModal();
}

const paydButton = function(id) {
    model.billPaydToggle(model.getID(id));
    listView.billLogic(model.date, model.state, model.getID(id));
}

const editControl = (id) => editView.render(model.getID(id))
const historyControl = (id) => historyView.render(model.getID(id))
const showModalControl = () => historyView.showModal();
const showNewBillModal = () => newBillView.render();
const backdropClose = () => historyView.backdropClose();
const editModalToggle = () => editView.showModal();

 
// Init
(() => {
    newBillView.addHandlerBillSubmit(addNewBill);
    dateView.render(model.currentDate());
    listView.addHandlerPaydButton(paydButton);
    listView.reloadLocalStorage(model.date, model.state);
    listView.addHandlerHistoryButton(historyControl);
    listView.addHandlerEditButton(editControl);
    historyView.addHandlerShowModal(showModalControl);
    historyView.addHistoryBackdropHandler(backdropClose);
    newBillView.addHandlerNewBillModal(showNewBillModal);
    editView.addHandlerShowModal(editModalToggle);
})();