// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cartItems');
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error('Failed to load cart from localStorage', e);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
};
// Defines Redux slice for cart management
// Actions: addToCart, removeFromCart, updateQuantity
// Persists cart to localStorage to survive page reloads
const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.push({ ...action.payload, quantity: 1 });
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter(i => i.id !== action.payload);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    },
    updateQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
      saveCartToLocalStorage(state);
    },
  },
});
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
