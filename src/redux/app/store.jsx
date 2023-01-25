import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import postsReducer from "../features/postsReducer";


export const store = configureStore({
    reducer : {
        posts : postsReducer,
    },
   
});

