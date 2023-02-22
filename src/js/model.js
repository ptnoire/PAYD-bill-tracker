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
    
    // Add Reciept if payd is false, set date ahead one month.

    // Can't get this right.

    if(selectedBill.payd === false) {
        selectedBill.history.push(historyReciept);
        // newDate = incrementMonthAndRetainDate(newDate)
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
    console.log(`Bill Date: ` + selectedBill.dueDate.fullDate);
    localStorageBills();
}

// Still doesn't work, now it jumps ahead 2 months to every 31st.

// function incrementMonthAndRetainDate(date) {
//     const newDate = new Date(date.getTime());
//     newDate.setMonth(newDate.getMonth() + 1);
//     const isLastDayOfMonth = date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//     if (isLastDayOfMonth) {
//       newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());
//     }
//     return newDate;
//   }
  

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