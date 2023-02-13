export class View {
    render(data) {
        if(!data) return;
        const markup = this._generateMarkup(data);
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }
}