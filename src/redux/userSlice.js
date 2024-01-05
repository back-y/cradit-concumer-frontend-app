// import { createSlice, nanoid } from "@reduxjs/toolkit";
// import { AppState } from "./store";

// const initialState = {
//     users: {},
// }

// export const userSlice = createSlice({
//     name: "users",
//     initialState,
//     reducers: {
//         addUsers(state, action) {
//             state.users = action.payload;

//             // const user = {
//             //     id: nanoid(),
//             //     value: action.payload,
//             // }
//             // state.users = user;
//         },

//         removeUsers(state, action) {
//             state.users = state.users.filter(user => user.id !== action.payload);
//         }
//     }
// });

// export const { addUsers, removeUsers } = userSlice.actions;

// export const getUsers = (state) => state.users;

// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

const initialState = {
    values: [],
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUsers(state, action) {
            state.values = action.payload;
        },

    }
});

export const { addUsers } = userSlice.actions;

export const getUsers = (state) => state.user.values;

export default userSlice.reducer;