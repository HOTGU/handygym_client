import { configureStore } from "@reduxjs/toolkit";

import addressReducer from "./addressSlice";
import postReducer from "./postSlice";
import userReducer from "./userSlice";

export default configureStore({
    reducer: {
        address: addressReducer,
        post: postReducer,
        user: userReducer,
    },
});
