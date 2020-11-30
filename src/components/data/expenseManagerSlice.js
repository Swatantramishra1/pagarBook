import { createSlice } from '@reduxjs/toolkit';

export const expenseManagerSlice = createSlice({
  name: 'expense',
  initialState: {
      data : {
        totalPaid: 0,
        totalRecieve: 0,
        "list": {
            "20-10-12": [
                {
                    "transaction-type": "paid | recieve",
                    "name":"",
                    "discription": "",
                    "amount": 0,
                    "date": "",
                    id: ""
                }
            ]
        }
      }
  },
  reducers: {
    // increment: state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },

    updateExpenses: (state,action) => {
        state.data =  action.payload
    }
  },
});

// ,increment, decrement, incrementByAmount

export const { updateExpenses } = expenseManagerSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.counter.value;

export const selectTotalExpenses = state => {
    return {
        paid: state.expense.data.totalPaid,
        recieve: state.expense.data.totalRecieve
    }
};


export const selectListData = state => {
    return state.expense.data.list;
};


export default expenseManagerSlice.reducer;
