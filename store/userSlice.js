import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/httpService';
import { getUserApi } from '@/utils/endpoints';
import Cookies from 'js-cookie';

// Async thunk for fetching user data from the API
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  if (Cookies.get('Authorization')) {
    const response = await API.get(getUserApi);
    return response?.data; // Assuming your API returns the user data in a 'data' field
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;