import { BILL_LIST } from "../js/config.js";
import { View } from "../js/view.js";

class ListView extends View {
    _parentElement = BILL_LIST;

    _generateMarkup(data) {
        console.log(data);
        return `
        <li class="bill__item"><h1>${data.bill.name}</h1>
        <h2>Amount Due: ${data.bill.amount}</h2>
        <h3>Due Date: ${data.bill.dueDate}</h3>
        </li>
        `
    }
}

export default new ListView();