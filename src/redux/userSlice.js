import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupApi, signinApi, refreshApi, logoutApi } from "../api";

import { onLoginSuccess, onLogoutSuccess } from "../utils/auth";

export const signup = createAsyncThunk(
    "user/signup",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await signupApi(formData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const signin = createAsyncThunk(
    "user/signin",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await signinApi(formData);
            onLoginSuccess(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const refresh = createAsyncThunk(
    "user/refresh",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await refreshApi();
            onLoginSuccess(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {
    try {
        const { data } = await logoutApi();
        onLogoutSuccess();
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {
            nickname: null,
            id: null,
        },
        pending: null,
        isAuth: false,
        error: false,
    },
    reducers: {},
    extraReducers: {
        [signup.pending]: (state) => {
            state.pending = true;
            state.error = false;
            state.isAuth = false;
        },
        [signup.fulfilled]: (state) => {
            state.pending = false;
            state.isAuth = false;
        },
        [signup.rejected]: (state) => {
            state.pending = false;
            state.isAuth = false;
            state.error = true;
        },
        [signin.pending]: (state) => {
            state.pending = true;
            state.error = false;
            state.isAuth = false;
        },
        [signin.fulfilled]: (state, action) => {
            state.pending = false;
            state.isAuth = true;
            state.userInfo.nickname = action.payload.userInfo.nickname;
            state.userInfo.id = action.payload.userInfo.id;
        },
        [signin.rejected]: (state) => {
            state.pending = false;
            state.error = true;
            state.isAuth = false;
        },
        [refresh.pending]: (state) => {
            state.pending = true;
            state.error = false;
            state.isAuth = true;
        },
        [refresh.fulfilled]: (state, action) => {
            state.pending = false;
            state.isAuth = true;
            state.userInfo.nickname = action.payload.userInfo.nickname;
            state.userInfo.id = action.payload.userInfo.id;
        },
        [refresh.rejected]: (state) => {
            state.pending = false;
            state.error = true;
            state.isAuth = false;
        },
        [logout.pending]: (state) => {
            state.pending = true;
            state.error = false;
            state.isAuth = true;
        },
        [logout.fulfilled]: (state) => {
            state.pending = false;
            state.isAuth = false;
            state.userInfo = {};
        },
        [logout.rejected]: (state) => {
            state.pending = false;
            state.error = true;
            state.isAuth = true;
        },
    },
});

export default userSlice.reducer;
