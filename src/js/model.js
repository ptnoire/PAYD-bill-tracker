
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
            reoccuring: newBill.reoccuring,
            history: [],
        }
        state.bills.push(state.bill);
        localStorageBills();
}

export const getID = function(id, historyId = false) {
    let index;
    let historyIndex;
    
    index = state.bills.findIndex(el => el.id === id);

    if (historyId){
        historyIndex = state.bills[index].history.findIndex(el => el.id === historyId);
        return state.bills[index].history[historyIndex];
    }
    return state.bills[index];
}

export const editBill = function(id, formData) {
    const selectedBill = getID(id)
    const dueDateFormat = new Date(formData.dueDate + " 00:01:00")
    
    if(formData.title) selectedBill.name = formData.title;
    if(formData.amount) selectedBill.amount = formData.amount;
    if(formData.duedate) selectedBill.dueDate = {
        fullDate: dueDateFormat,
        year: dueDateFormat.getFullYear(),
        month: (dueDateFormat.getMonth() + 1),
        day: dueDateFormat.getDate(),
    }
    selectedBill.reoccuring = formData.reoccuring;
    localStorageBills();
}

export const historyEditBill = function(id, historyid, newamount) {
    const selectedItem = getID(id, historyid)
    if(newamount) selectedItem.paid = newamount;
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


function incrementMonthAndRetainDate(date) {
    const newDate = new Date(date.getTime());
    const isLastDayOfMonth = date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        if (isLastDayOfMonth) {
            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() + 1);
            newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());
            return newDate
        }
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  }

// export const daysLeftUntilDue = function(dueDate) {

//     const otherDate = dueDate;
//     const today = date.currentDate.fullDate;

//     const timeDiff = otherDate.getTime() - today.getTime();

//     const daysUntilDue = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//     const weeksUntilDue = Math.ceil(daysUntilDue / 7);
//     console.log("Due date from other date (days): " + daysUntilDue);
//     console.log("Due date from other date (weeks): " + weeksUntilDue);
// }

export const sortList = function(parameter) {
    if(parameter === 'Sort List') return state.bills;

    if (parameter === 'Lowest Cost')
    return state.bills.sort((a, b) => a.amount - b.amount);

    if (parameter === 'Highest Cost')
    return state.bills.sort((a, b) => b.amount - a.amount);

    if (parameter === 'Closest Date')
    return state.bills.sort((a,b) => dateComparison(a, b));
    
    if (parameter === 'Ascending Name')
    return state.bills.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
}

const dateComparison = function(a, b) {
    const firstDate = new Date(a.dueDate.fullDate).getTime();
    const secondDate = new Date(b.dueDate.fullDate).getTime();
    return firstDate - secondDate;
}





// Setting the state.bills array to local storage for persistance.
const localStorageBills = function() {
    localStorage.setItem('bills', JSON.stringify(state.bills));
}

export const removeBill = function(id) {
    const index = state.bills.findIndex(el => el.id === id);
    state.bills.splice(index, 1);
    localStorageBills();
}

export const removeHistoryItem = function(id, historyId) {
    
    const specificBill = getID(id)
    
    const index = specificBill.history.findIndex(el => el.id === historyId);
    specificBill.history.splice(index, 1);
    
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