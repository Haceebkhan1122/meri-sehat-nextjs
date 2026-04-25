import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/httpService';
import { myCart, labPayment } from '@/utils/endpoints';
import Cookies from 'js-cookie';

// Async thunk for fetching user data from the API
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const auth = Cookies.get("Authorization")
  const guestId = Cookies.get("guestId")
  if (guestId || auth) {
    const response = await API.get(`${myCart}${!auth ? `?guest_id=${guestId}` : ''}`);
    return response?.data;
  }
});

export const fetchLabPayments = createAsyncThunk('cart/fetchLabPayments', async () => {
  const auth = Cookies.get("Authorization")
  const guestId = Cookies.get("guestId")
  if (guestId || auth) {
    const response = await API.get(`${labPayment}${!auth ? `?guest_id=${guestId}` : ''}`);
    return response.data;
  }
});


const myCartSlice = createSlice({
  name: 'cart',
  initialState: {
    myCartData: null,
    loading: false,
    error: null,
    paymentData: {},
    paymentError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.myCartData = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLabPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLabPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
      })
      .addCase(fetchLabPayments.rejected, (state, action) => {
        state.loading = false;
        state.paymentError = action.error.message;
      });
  },
});

export default myCartSlice.reducer;