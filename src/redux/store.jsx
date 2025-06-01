import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
// Configures the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
