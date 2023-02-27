// FROM CONFIG FILE: All Values can be changed there.
import { SORT_BUTTON } from "../js/config.js";

// Parent Class For DOM Interaction
import { View } from "./view.js";

class SortView extends View {
    _button = SORT_BUTTON;

    addHandlerSortEvent(handler) {
        this._button.addEventListener('change', function(e) {
            handler(`${e.target.value}`);
        })
    }
}

export default new SortView();