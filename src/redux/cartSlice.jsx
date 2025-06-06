import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Async Thunks with JWT token manually included ---
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDFmYmFlYTM2N2NhMDQ0NmU1OWVmNyIsImlhdCI6MTc0OTE4MDMyNSwiZXhwIjoxNzQ5MjY2NzI1fQ.1rVho9vVdMqnt8FNfn8S9Y1hCtkITPEivCvH2W3DttM';
// Fetch cart items by userId
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:5000/cart?userId=${userId}`);
      return response.data; // assuming API returns array of cart items
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Add a product to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async (product) => {
  const response = await axios.post(
    'http://localhost:5000/cart',
    {
      productId: product._id,
      quantity: 1,
    },
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );
  return response.data; // returning full cart item (with cart item _id and product info)
});
// Remove a cart item by its MongoDB _id
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (cartItemId) => {
  await axios.delete(`http://localhost:5000/cart/${cartItemId}`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return cartItemId;
});
//Update quantity of a cart item
export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ id, quantity }) => {
  await axios.put(
    `http://localhost:5000/cart/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );
  return { id, quantity };
});

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = state.find(i => i._id === action.payload._id);
        if (item) {
          item.quantity += 1;
        } else {
          state.push(action.payload);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        return state.filter(item => item._id !== action.payload);
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const item = state.find(i => i._id === action.payload.id);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      });
  }
});

export default cartSlice.reducer;