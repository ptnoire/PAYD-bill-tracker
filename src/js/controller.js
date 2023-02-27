import listView from "../views/listView.js";
import dateView from "../views/dateView.js";
import historyView from "../views/historyView.js";
import editView from "../views/editView.js";
import newBillView from "../views/newBillView.js";
import historyEditView from "../views/historyEditView.js";
import confirmView from "../views/confirmView.js";
import sortView from "../views/sortView.js";
import * as model from "./model.js"

// Debugging Purposes
const clearButton = document.querySelector('.clear_local_storage');
clearButton.addEventListener('click', model.clearLocalStorageBills)
//

////////////////////////////////////////////
////////////////////////////////////////////

///// [ Adding New Items ] /////

// + Showing the New Bill Window //
const showNewBillModal = () => {
    newBillView.render()
    newBillView.addHandlerBillSubmit(addNewBill);
};

// + Adding a New Bill //
const addNewBill = function(formData) {
    model.loadBill(formData);
    listView.render(model.state);
    listView.billLogic(model.date, model.state);
    newBillView.showModal();
}

////////////////////////////////////////////
////////////////////////////////////////////

///// [ Editting Items ] /////

// + Opening an Edit Window
const editControl = (id) => {
    editView.render(model.getID(id));
    editView.addHandlerBillSubmit(editBillControl, id);
    editView.addHandlerDelete(deleteConfirm, id);
}

// + Toggling Visibility of Edit Window //
const editModalToggle = () => editView.showModal();

// + Editting the Bill's Data with User's Input
const editBillControl = function(formData, id) {
    model.editBill(id, formData)
    listView.billLogic(model.date, model.state, model.getID(id))
    editView.showModal();
}

// + Confirmation of Deleting Bill Before Deletion.
const deleteConfirm = (id) => {
    confirmView.render(model.getID(id));
    confirmView.addHandlerDelete(deleteControl, id);
    confirmView.addHandlerShowModal(backdropClose);
};

// + Deleting a Bill from Object Permanently.
const deleteControl = (id) => {
    model.removeBill(id);
    listView.reloadLocalStorage(model.date, model.state);
    backdropClose();
    editView.showModal();
}

// + Clicking the Payd Button.
const paydButton = function(id) {
    model.billPaydToggle(model.getID(id));
    listView.billLogic(model.date, model.state, model.getID(id));
}

/// HISTORY ///

// + Opening the View History Modal
const historyControl = (id) => historyView.render(model.getID(id))

// + Clicking the Edit History Button
const historyEditControl = (id, historyId) => {
    historyEditView.render(model.getID(id, historyId))
    historyEditView.addHandlerDelete(confirmDeleteHistory, id, historyId);
}

const confirmDeleteHistory = (id, historyId) => {
    confirmView.render(model.getID(id, historyId));
    confirmView.addHandlerDelete(deleteHistoryControl, id, historyId);
}

const deleteHistoryControl = (id, historyId) => {
    console.log('worked');
    model.removeHistoryItem(id, historyId);
    backdropClose();
}

// + Toggle the Modal Window
const showModalControl = () => historyView.showModal();
const backdropClose = () => historyView.backdropClose();

// + Editing History's Data, Re-rendering Modal
const newHistoryEdit = (billid, dataid, newinput) => {
    model.historyEditBill(billid, dataid, newinput);
    historyView.render(model.getID(billid));
}

////////////////////////////////////////////
////////////////////////////////////////////

// + Sorting The List
const sortChange = (para) => {
    listView.sortRender(model.date, model.sortList(para))
};
 



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
    historyEditView.addHandlerShowModal(newHistoryEdit);
    sortView.addHandlerSortEvent(sortChange);
})();