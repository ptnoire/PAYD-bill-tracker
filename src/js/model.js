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
    localStorage: [],
};

export const loadBill = function(newBill) {
        state.bill = {
            name: newBill.name,
            amount: newBill.amount,
            dueDate: newBill.dueDate,
            id: newBill.id ? newBill.id :Date.now(),
            payd: newBill.payd ? newBill.payd : false,
            ...(newBill.reoccuring && {reoccuring: newBill.reoccuring}),
        }
        state.bills.push(state.bill);
        localStorageBills();
}

export const billPaydToggle = function(id) {
    const index = state.bills.findIndex(el => el.id === id);
    state.bills[index].payd = !state.bills[index].payd;
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
//    ---> UNEXPORT WHEN FINAL <----
export const clearLocalStorageBills = function() {
    localStorage.clear('bills');
}

// clearLocalStorageBills();

const init = async function() {
    const history = localStorage.getItem('bills');
    if(history) {
        state.bills = JSON.parse(history)
    };
}
init();