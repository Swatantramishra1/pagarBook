import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import expenseReducer from '../components/data/expenseManagerSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    expense: expenseReducer
  },
});
