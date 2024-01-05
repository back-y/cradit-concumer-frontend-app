import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // basicInfo: null,
    // legalInfo: null,
    // creditInfo: null,
    entities: [],
}

export const candidateSlice = createSlice({
    name: "ifPaid",
    initialState,
    reducers: {
        // addBasicInfo(state, action) {
        //     state.basicInfo = action.payload;
        // },

        // addLegalInfo(state, action) {
        //     state.legalInfo = action.payload;
        // },

        // addCreditInfo(state, action) {
        //     state.creditInfo = action.payload;
        // },

        // addCandidates(state, action) {
        //     state.entities = action.payload;
        // }
        addPaidInfo(state, action) {
            state.paidInfo = action.payload;
        },

    }
});

export const {
    //  addBasicInfo, addLegalInfo, addCreditInfo, addCandidates 
    addPaidInfo
} = candidateSlice.actions;


export const getPaidInfo = (state) => state.candidate.legalInfo;

// export const getBasicInfo = (state) => state.candidate.basicInfo;
// export const getLegalInfo = (state) => state.candidate.legalInfo;
// export const getCreditInfo = (state) => state.candidate.creditInfo;
// export const getCandidates = (state) => state.candidate.entities;
export default candidateSlice.reducer;