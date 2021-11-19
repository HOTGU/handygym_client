import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddressByTerm } from "../api";

export const searchAddress = createAsyncThunk("address/search", async (term) => {
    const { data } = await getAddressByTerm(term);
    return data;
});

export const addressSlice = createSlice({
    name: "address",
    initialState: {
        address: [],
        pending: null,
        error: false,
    },
    reducers: {
        init: (state, action) => {
            state.address = [];
        },
    },
    extraReducers: {
        [searchAddress.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },
        [searchAddress.fulfilled]: (state, action) => {
            state.pending = false;
            state.address = action.payload;
        },
        [searchAddress.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
    },
});

export const { init } = addressSlice.actions;

export default addressSlice.reducer;
