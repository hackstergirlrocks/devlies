import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, skin: null, music: true, username: null },
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
    setMusic: (state, action) => {
      state.value.music = action.payload;
    },
    setUsername: (state, action) => {
      state.value.username = action.payload;
    },
    logout: (state) => {
      state.value.token = null;
    },
  },
});

export const { login, logout, setSkin, setMusic, setUsername} = userSlice.actions;
export default userSlice.reducer;
