// FROM CONFIG FILE: All Values can be changed there.
import { CURRENT_DATE_DISPLAY } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class DateView extends View {
    _parentElement = CURRENT_DATE_DISPLAY;

    _generateMarkup() {
        this._clear();
        return `
        <h1 class="current_date">${this.data.currentDate.year} - ${this.data.currentDate.month} - ${this.data.currentDate.day}</h1>
        <h3>Session started at: ${this.data.currentDate.time}</h2>
        `
    }
}

export default new DateView();