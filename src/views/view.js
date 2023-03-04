import { TOP_OF_PAGE } from "../js/config.js";

export class View {
    _top = TOP_OF_PAGE;
    data;
    newUser;

    render(data) {
        if(!data) return;
        this.data = data;
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    _clear() {
        this._parentElement.innerHTML = '';
    }

    scrollToTop() {
        this._top.scrollIntoView({behavior: 'smooth'});
    }

    scrollToParent() {
        this._parentElement.scrollIntoView({behavior: 'smooth'});
    }

    showModal() {
        if(this._backdrop) this._backdrop.classList.toggle('hidden');
        this._parentElement.classList.toggle('hidden');
    }

    backdropClose() {
        this._parentElement.classList.add('hidden');
        this._backdrop.classList.add('hidden');
    }

    addHandlerBillSubmit(handler, id) {
        this.inputForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataArr = new FormData(this);
            const data = Object.fromEntries(dataArr)
            handler(data, id);
        })
    }

    addHandlerShowModal(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const link = e.target.closest('.cancel_btn');
            if(!link) return
            handler();
        })
    }

    addHandlerDelete(handler, id, historyId) {
        this._deleteButton = this._parentElement.querySelector('.delete_btn');
        this._deleteButton.addEventListener('click', function(e) {
            handler(id, historyId)
        })
    }
}