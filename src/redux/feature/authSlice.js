// // features/auth/authSlice.js
// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   values: []
// }


// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     addAuthUsers(state, action) {
//       state.values = action.payload;
//     },
//   },
//   extraReducers: {

//   },
// })

// export const { addAuthUsers } = authSlice.actions;

// export const getAuthUsers = (state) => state.auth.values;

// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  values: [],
  isLoggedIn: false,
  jwt: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuthUsers(state, action) {
      state.values = action.payload;
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.jwt = action.payload.jwt;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.jwt = null;
    },
  },
  extraReducers: {

  },
})

export const { addAuthUsers, login, logout } = authSlice.actions;

export const getAuthUsers = (state) => state.auth.values;

export const isLoggedIn = (state) => state.auth.isLoggedIn;

export const getJwt = (state) => state.auth.jwt;

export default authSlice.reducer;

