import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createLearnerPost, getLearnerPosts } from "../api";

export const fetchAllPosts = createAsyncThunk(
    "post/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getLearnerPosts();

            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createPost = createAsyncThunk(
    "post/create",
    async (postData, { rejectWithValue }) => {
        try {
            const { data } = await createLearnerPost(postData);
            console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        pending: null,
        error: false,
    },
    reducers: {
        initError: (state) => {
            state.error = false;
        },
    },
    extraReducers: {
        [fetchAllPosts.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },
        [fetchAllPosts.fulfilled]: (state, action) => {
            state.pending = false;
            state.posts = action.payload;
        },
        [fetchAllPosts.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
        [createPost.pending]: (state) => {
            state.pending = true;
            state.error = false;
        },
        [createPost.fulfilled]: (state, action) => {
            state.pending = false;
            state.posts = [...state.posts, action.payload];
        },
        [createPost.rejected]: (state) => {
            state.pending = false;
            state.error = true;
        },
    },
});

export const { initError } = postSlice.actions;

export default postSlice.reducer;
