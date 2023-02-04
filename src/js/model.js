

export const state = {
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

export const loadBill = async function(name, cost, date) {
    try {
        state.bill = {
            name: name,
            amount: cost,
            dueDate: date,
        }
        state.bills.push(state.bill);
    } catch(err) {
        console.error(`${err.message} ✨✨✨`)
        throw err;
    }
}