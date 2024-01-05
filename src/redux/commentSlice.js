
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const initialState = {
    comments : [],
    order: {}
}

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComments(state, action) {
            state.comments = action.payload;
        },
        addOrderToComment(state, action) {
            state.order = action.payload;
        }

    }
});

export const { addComments, addOrderToComment} = commentSlice.actions;

export const getComments = (state) => state.comments;

export const getOrderInComment = (state) => state.order;

export default commentSlice.reducer;