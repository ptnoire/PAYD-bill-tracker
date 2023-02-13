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
}