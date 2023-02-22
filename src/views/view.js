export class View {
    data;

    render(data) {
        if(!data) return;
        this.data = data;
        const markup = this._generateMarkup();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    _clear() {
        this._parentElement.innerHTML = '';
    }

    showModal() {
        this._parentElement.classList.toggle('hidden');
        this._backdrop.classList.toggle('hidden');
    }

    backdropClose() {
        this._parentElement.classList.add('hidden');
        this._backdrop.classList.add('hidden');
    }

    addHandlerBillSubmit(handler) {
        this.inputForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataArr = new FormData(this);
            const data = Object.fromEntries(dataArr)
            handler(data);
            console.log(data);
            // Clear Input Field!!
        })
    }
}