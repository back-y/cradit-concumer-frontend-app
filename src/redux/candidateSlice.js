import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    basicInfo: null,
    legalInfo: null,
    creditInfo: null,
    profilePicture:null,
    entities: [],
}

export const candidateSlice = createSlice({
    name: "candidate",
    initialState,
    reducers: {
        addBasicInfo(state, action) {
            state.basicInfo = action.payload;
            state.basicInfo.numberOfEmployees = parseInt(action.payload.numberOfEmployees);
            state.basicInfo.numberOfBranches = parseInt(action.payload.numberOfBranches);
            state.basicInfo.expectedCredit = parseInt(action.payload.expectedCredit);
            console.log("form candidat slice",action.payload)
        },

        addLegalInfo(state, action) {
            state.legalInfo = action.payload;
        },
        addProfilePicture(state,action){
            state.profilePicture= action.payload
        },

        addCreditInfo(state, action) {
            state.creditInfo = action.payload;
        },

        addCandidates(state, action) {
            state.entities = action.payload;
        }
    }
});

export const { addBasicInfo, addLegalInfo, addCreditInfo, addCandidates,addProfilePicture } = candidateSlice.actions;

export const getBasicInfo = (state) => state.candidate.basicInfo;
export const getLegalInfo = (state) => state.candidate.legalInfo;
export const getPofilePicture= (state)=> state.candidate.profilePicture
export const getCreditInfo = (state) => state.candidate.creditInfo;
export const getCandidates = (state) => state.candidate.entities;
export default candidateSlice.reducer;