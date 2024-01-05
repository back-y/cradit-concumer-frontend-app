import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const initialState = {
    items: [],
    order: {},
}

export const editCartSlice = createSlice({
    name: "editCart",
    initialState,
    reducers: {
        addItemToCart(state, action) {
            state.items = action.payload;
        },
        removeItemFromCart(state, action) {
            state.items = action.payload;
        },
        addOrderToCart(state, action) {
            state.order = action.payload
        }
    }
});

export const { addItemToCart, removeItemFromCart, addOrderToCart } = editCartSlice.actions;

export const getItemsInCart = (state) => state.editCart.items;

export const getTotalAmount = (state) => state.editCart.totalAmount;

export const getOrderInCart = (state) => state.editCart.order;

export default editCartSlice.reducer;