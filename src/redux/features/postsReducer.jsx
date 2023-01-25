import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  return data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (value) => {
    return await axios
      .post(`https://jsonplaceholder.typicode.com/posts`, value)
      .then((res) => {
        return res.data;
      });
  }
);

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = "error";
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    [addNewPost.rejected]: (state, action) => {
      state.error = "error";
    },
   
  },
});

export default postsSlice.reducer;
