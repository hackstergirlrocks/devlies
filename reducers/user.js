import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, skin: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
    },
    setSkin: (state, action) => {
      state.value.skin = action.payload.skin;
    },
    logout: (state) => {
      state.value.token = null;
    },
  },
});

export const { login, logout, setSkin } = userSlice.actions;
export default userSlice.reducer;
