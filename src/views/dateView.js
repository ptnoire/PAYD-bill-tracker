// FROM CONFIG FILE: All Values can be changed there.
import { CURRENT_DATE_DISPLAY } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class DateView extends View {
    _parentElement = CURRENT_DATE_DISPLAY;

    _generateMarkup() {
        this._clear();
        return `
        <h2 class="current_date">${this.data.currentDate.year} - ${this.data.currentDate.month} - ${this.data.currentDate.day}</h2>
        <p>Session started at: ${this.data.currentDate.time}</p>
        `
    }
}

export default new DateView();