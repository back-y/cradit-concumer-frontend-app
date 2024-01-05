import {createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart(state, action) {
            state.items = action.payload;
        },        
        removeItemFromCart(state, action) {
            state.items = action.payload;
        },
    }
});
export const { addItemToCart, setTotalAmount, removeItemFromCart } = cartSlice.actions;

export const getItemsInCart = (state) => state.cart.items;
export const getTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;