import listView from "../views/listView.js";
import dateView from "../views/dateView.js";
import historyView from "../views/historyView.js";
import editView from "../views/editView.js";
import newBillView from "../views/newBillView.js";
import historyEditView from "../views/historyEditView.js";
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

const editBillControl = function(formData, id) {
    model.editBill(id, formData)
    listView.billLogic(model.date, model.state, model.getID(id))
    editView.showModal();
}

const editControl = (id) => {
    editView.render(model.getID(id));
    editView.addHandlerBillSubmit(editBillControl, id);
    editView.addHandlerDelete(deleteControl, id);
}

const deleteControl = (id) => {
    model.removeBill(id);
    listView.reloadLocalStorage(model.date, model.state);
    editView.showModal();
}

const paydButton = function(id) {
    model.billPaydToggle(model.getID(id));
    listView.billLogic(model.date, model.state, model.getID(id));
}

const historyControl = (id) => historyView.render(model.getID(id))

const historyEditControl = (id, historyId) => historyEditView.render(model.getID(id, historyId))

const showModalControl = () => historyView.showModal();
const showNewBillModal = () => {
    newBillView.render()
    newBillView.addHandlerBillSubmit(addNewBill);
};
const backdropClose = () => historyView.backdropClose();
const editModalToggle = () => editView.showModal();

const newHistoryEdit = (billid, dataid, newinput) => {
    model.historyEditBill(billid, dataid, newinput);
    historyView.render(model.getID(billid));
}
 
// Init
(() => {
    newBillView.addHandlerNewBillModal(showNewBillModal);
    dateView.render(model.currentDate());
    listView.reloadLocalStorage(model.date, model.state);
    listView.addHandlerPaydButton(paydButton);
    listView.addHandlerHistoryButton(historyControl);
    listView.addHandlerEditButton(editControl);
    historyView.addHandlerShowModal(showModalControl);
    historyView.addHistoryBackdropHandler(backdropClose);
    historyEditView.addHandlerHistoryEditButton(historyEditControl);
    editView.addHandlerShowModal(editModalToggle);
    historyEditView.addHandlerEditHistoryItem(newHistoryEdit);
})();