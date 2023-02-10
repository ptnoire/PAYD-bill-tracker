

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

export const loadBill = async function(newBill) {
    try {
        state.bill = {
            name: newBill.billName,
            amount: newBill.billCost,
            dueDate: newBill.billDate,
            id: Date.now(),
            ...(newBill.reoccuring && {reoccuring: newBill.reoccuring}),
        }
        state.bills.push(state.bill);
    } catch(err) {
        console.error(`${err} ✨✨✨`)
        throw err;
    }
}