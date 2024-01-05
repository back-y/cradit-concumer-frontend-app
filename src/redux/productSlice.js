import {createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const initialState = {
    items: [],
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProducts(state, action) {
            state.items = action.payload;
        },
        
    }
});
export const { addProducts } = productSlice.actions;

export const getProducts = (state) => state.product.items;

export default productSlice.reducer;