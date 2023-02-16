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
    const newDate = (selectedBill.reoccuring ? new Date(selectedBill.dueDate.fullDate) : new Date(date.currentDate.fullDate));
    console.log(selectedBill.dueDate.fullDate);
    console.log(`🔥🔥🔥`, newDate);

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


    // Omg I can't figure this out, try going from Dec -> Jan, it skips a month. I'm coming back to this. Fuck it. feb 16
    
    if(selectedBill.payd === false) {
        selectedBill.history.push(historyReciept);
        newDate.setMonth((selectedBill.dueDate.month + 1));
        if(newDate.getMonth() !== 1) newDate.setDate(0);
        console.log(`🔥` + newDate.getMonth());
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

// The worst of all, alternating end dates requrie some sort of math. I think this is the best way to do this, right? Could be improved but this should mean that no matter what end date you select, it will correct the date to month's actually end date.

// Omfg, setDate(0) exists. I am really bad. So embarrassing. I am leaving this below cause I thought I was really clever. Go ahead laugh at me.

// const dateCorrection = (day, month) => {
//     console.log(`Inputs: ` + day, month);
//     if(+day === 31) {
//         if (month === 1 | 3 | 5 | 7 | 8 | 10 | 12) return 31
//         if (month === 2) return 28
//         if (month === 4 | 6 | 9 | 11) return 30
//     }
//     if (+day === 30) {
//         if (month === 1 | 3 | 5 | 7 | 8 | 10 | 12) return 31
//         if (month === 2) return 28
//         if (month === 4 | 6 | 9 | 11) return 30
//     }
//     if (+day === 28) {
//         if (month === 1 | 3 | 5 | 7 | 8 | 10 | 12) return 31
//         if (month === 2) return 28
//         if (month === 4 | 6 | 9 | 11) return 30
//     }
//     else return +day;
// }


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


// clearLocalStorageBills();

const init = async function() {
    const history = localStorage.getItem('bills');
    if(history) {
        state.bills = JSON.parse(history)
    };
}
init();