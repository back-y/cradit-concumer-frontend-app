import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: {},
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder(state, action) {
            state.order = action.payload;
        },        
    }
});
export const { addOrder } = orderSlice.actions;

export const getOrder = (state) => state.order.order;

export default orderSlice.reducer;