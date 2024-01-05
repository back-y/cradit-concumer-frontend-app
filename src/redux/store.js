import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { editCartSlice } from "./editCartSlice";
import { productSlice } from './productSlice';
import { createWrapper } from "next-redux-wrapper";
import { userSlice } from "./userSlice";
import { commentSlice } from "./commentSlice";
import authReducer from "./feature/authSlice";
import { customerSlice } from "./customerSlice";
import { candidateSlice } from "./candidateSlice";
import { orderSlice } from "./orderSlice";

// import api from "./feature/api";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,

      // [api.reducerPath]: api.reducer,z
      [editCartSlice.name]: editCartSlice.reducer,
      [cartSlice.name]: cartSlice.reducer,
      [productSlice.name]: productSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [commentSlice.name]: commentSlice.reducer,
      [customerSlice.name]: customerSlice.reducer,
      [candidateSlice.name]: candidateSlice.reducer,
      [orderSlice.name]: orderSlice.reducer,
    },
    middleware: (getDefault) => getDefault(),
    devTools: true,
  })

export const wrapper = createWrapper(makeStore); 