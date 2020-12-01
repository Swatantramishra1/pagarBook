import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from '../components/data/expenseManagerSlice';

export default configureStore({
  reducer: {
    expense: expenseReducer
  },
});
