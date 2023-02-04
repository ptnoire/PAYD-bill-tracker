export class View {
    render(data) {
        if(!data) return;
        this.data = data;
        const markup = this._generateMarkup(data);
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}