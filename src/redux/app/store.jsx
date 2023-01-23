import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import postsReducer from "../features/postsReducer";
import { ApiSlice } from "../features/Apislice";

export const store = configureStore({
    reducer : {
        posts : postsReducer,
        [ApiSlice.reducerPath]: ApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(ApiSlice.middleware),
});
setupListeners(store.dispatch)
