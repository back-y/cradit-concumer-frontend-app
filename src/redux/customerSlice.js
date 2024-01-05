import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    entities: null
}

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        addCustomers(state, action) {
            state.entities = action.payload;
        }
    }
});

export const { addCustomers } = customerSlice.actions;

export const getCustomers = (state) => state.customer.entities;

export default customerSlice.reducer;