import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const initialState = {
    isLoggedIn: false,
    user: null,
    jwt: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.jwt = action.payload.jwt;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            state.jwt = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export const isLoggedIn = (state) => state.auth.isLoggedIn;

export const getUser = (state) => state.auth.user;

export const getJwt = (state) => state.auth.jwt;

export default authSlice.reducer;