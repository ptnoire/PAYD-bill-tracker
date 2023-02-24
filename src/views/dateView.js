// FROM CONFIG FILE: All Values can be changed there.
import { CURRENT_DATE_DISPLAY } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class DateView extends View {
    _parentElement = CURRENT_DATE_DISPLAY;

    _generateMarkup() {
        this._clear();
        return `
        <p class="current_date">Welcome back! It's ${this.data.currentDate.year} - ${this.data.currentDate.month} - ${this.data.currentDate.day} 💰 Your session started at: ${this.data.currentDate.time}</p>
        
        `
    }
}

export default new DateView();