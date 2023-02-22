import listView from "../views/listView.js";


export let date = {
    currentDate: {
        year: 0,
        month: 0,
        day: 0,
        time: 0,
        fullDate: 0,
    }
}

export const currentDate = function() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return date = {
        currentDate: {
            year: year,
            month: +month,
            day: +day,
            time: (`${+hour}:${+minute}:${+seconds}`),
            fullDate: now,
        }
    }
}


export let state = {
    bill: {
        name: '',
        amount: 0,
        dueDate: '',
        reoccuring: false,
    },
    bills: [],
};


export const loadBill = function(newBill) {
        const dueDateFormat = new Date(newBill.dueDate + " 00:01:00");
        state.bill = {
            name: newBill.title,
            amount: newBill.amount,
            dueDate: {
                fullDate: dueDateFormat,
                year: dueDateFormat.getFullYear(),
                month: (dueDateFormat.getMonth() + 1),
                day: dueDateFormat.getDate(),
            },
            id: newBill.id ? newBill.id :Date.now(),
            payd: newBill.payd ? newBill.payd : false,
            ...(newBill.reoccuring && {reoccuring: newBill.reoccuring}),
            history: [],
        }
        state.bills.push(state.bill);
        localStorageBills();
        console.log(state)
}

export const getID = function(id) {
    const index = state.bills.findIndex(el => el.id === id);
    return state.bills[index];
}

export const editBill = function(id, formData) {
    const selectedBill = getID(id)
    const dueDateFormat = new Date(formData.dueDate + " 00:01:00");
    selectedBill = {
        name: formData.title,
        amount: formData.amount,
        dueDate: {
            fullDate: dueDateFormat,
            year: dueDateFormat.getFullYear(),
            month: (dueDateFormat.getMonth() + 1),
            day: dueDateFormat.getDate(),
        },
        ...(formData.reoccuring && {reoccuring: formData.reoccuring}),
    }
    console.log(selectedBill, state.bills);
}

export const billPaydToggle = function(selectedBill) {
    let newDate = (selectedBill.reoccuring ? new Date(selectedBill.dueDate.fullDate) : new Date(date.currentDate.fullDate));

    const historyReciept = {
        title: selectedBill.name,
        paid: selectedBill.amount,
        date: {
            year: date.currentDate.year,
            month: date.currentDate.month,
            day: date.currentDate.day,
            time: date.currentDate.time,
        },
        id: Date.now(),
    }
    
    if(selectedBill.payd === false) {
        selectedBill.history.push(historyReciept);
        newDate = incrementMonthAndRetainDate(newDate)
    }

    selectedBill.payd = !selectedBill.payd;

    if(selectedBill.reoccuring) {
        selectedBill.dueDate = {
        fullDate: newDate,
        year: newDate.getFullYear(),
        month: (newDate.getMonth() + 1),
        day: newDate.getDate(),
        }
    }
    localStorageBills();
}

// The nastiest of bugs, finally defeated. Full comments in function.
function incrementMonthAndRetainDate(date) {
    // Get the old date and store it.
    const newDate = new Date(date.getTime());

    // We are going to take the old date, check to see if it is the end of the month and set it to a boolean that we will check.

    // The important note here is .getMonth() + 1, 0 which sets the month forward and then checks the last day of the PREVIOUS month, then the final chained call is 'getDate' to see if the date of what we inputted is exactly the same as the last day of the month.

    const isLastDayOfMonth = date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        // If the above boolean is true, return a new date with an updated last day of the month.
        if (isLastDayOfMonth) {

            // !! IMPORTANT !! - Move the date to the first.
            // This was the bug that took a week to figure out, if the date is the end of the month and it sets the month forward, it will set it 2 months forward, so we are going to set it to the first to make sure that the month is always incremented by one.
            newDate.setDate(1);

            // Now set the month ahead by one.
            newDate.setMonth(newDate.getMonth() + 1);

            newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());

            return newDate
        }

    newDate.setMonth(newDate.getMonth() + 1);

    //Return this date format.
    return newDate;
  }
  

// Setting the state.bills array to local storage for persistance.
const localStorageBills = function() {
    localStorage.setItem('bills', JSON.stringify(state.bills));
}

// For Deleting Bills from List / Storage (Not Implemented Yet)
const removeBill = function(id) {
    const index = state.bills.findIndex(el => el.id === id);
    state.bills.splice(index, 1);
    localStorageBills();
}

// Testing Purposes (Just call it once to delete storage)
//    ---> UNEXPORT WHEN FINAL <----
export const clearLocalStorageBills = function() {
    localStorage.clear('bills');
}

const init = function() {
    const history = localStorage.getItem('bills');
    if(history) {
        state.bills = JSON.parse(history)
    };
}
init();