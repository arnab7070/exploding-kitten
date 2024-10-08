import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
