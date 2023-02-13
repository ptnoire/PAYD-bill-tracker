import listView from "../views/listView.js";


export let date = {
    currentDate: {
        year: 0,
        month: 0,
        day: 0,
        time: 0,
    }
}

export const currentDate = function() {
    const now = new Date();
    const month = (now.getMonth() + 1);
    const day = now.getDate();
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconds = now.getSeconds();
    return date = {
        currentDate: {
            year: year,
            month: month,
            day: day,
            time: (`${hour}:${minute}:${seconds}`),
        }
    }
}


export let state = {
    bill: {
        name: '',
        amount: 0,
        dueDate: '',
        reoccuring: false,
        extraCharges: 0,
        index: 0,
    },
    bills: [],
};

export const loadBill = async function(newBill) {
    try {
        state.bill = {
            name: newBill.billName,
            amount: newBill.billCost,
            dueDate: newBill.billDate,
            id: Date.now(),
            payd: false,
            ...(newBill.reoccuring && {reoccuring: newBill.reoccuring}),
        }
        state.bills.push(state.bill);
        // localStorageBills();
    } catch(err) {
        console.error(`${err} ✨✨✨`)
        throw err;
    }
}

export const billPaydToggle = function(id) {
    const index = state.bills.findIndex(el => el.id === id);
    console.log(state.bills);
    state.bills[index].payd = !state.bills[index].payd;
    console.log(state.bills[index]);
}


// Setting the state.bills array to local storage for persistance.

// Issue right now is when we use the render function from ListView it reads from the state.bill object, not the array. Perhaps we run the local storage as individual items and pass it through the function loadBill? Or create a new render function for stored content. -FEB 11th

const localStorageBills = function() {
    localStorage.setItem('bills', JSON.stringify(state.bills));
}

// For Deleting Bills from List / Storage (Not Implemented Yet)
const removeBill = function() {
    const findBill = state.bills.findIndex(el => el.id === id);
    state.bills.splice(index, 1);
    localStorageBills();
}

// Testing Purposes (Just call it once to delete storage)
const clearLocalStorageBills = function() {
    localStorage.clear('bills');
}


// This will check the values of the due date (just the day-date) against the current date to see if they align and will add the class 'bill_due' which just colors the dom element red,  in the future I want to be able to sort and color these by dates / paid properties.


// This needs to be moved to List View because it uses DOM elements, or take the Dom element const and move it else where then run this logic as folows in the model view.
export const billLogic = async function(bill) {
    try {
        state.bills.forEach(bill => {
            const elem = document.querySelector(`[data-bill_id="${bill.id}"]`);
            if (date.currentDate.day === +bill.dueDate.slice(-2)) {
                elem.classList.add('bill_due');
            }
        })
    } catch(err) {
        console.error(`${err} 🔥`)
    }
}

const init = async function() {
    const history = localStorage.getItem('bills');
    if(history) {
        state.bills = JSON.parse(history)
        console.log(state)
        state.bills.forEach(el => {
            listView.render(el);
            billLogic(el);
        });
    };
}
init();