import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsReducer";


export const store = configureStore({
    reducer : {
        posts : postsReducer,
    },
});

