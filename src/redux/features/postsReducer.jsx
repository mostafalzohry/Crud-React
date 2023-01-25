import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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

export const updatePosts = createAsyncThunk(
  "posts/updatePosts",
  async (value) => {
    return await axios
      .put(`https://jsonplaceholder.typicode.com/posts/${value.id}`, value)
      .then((res) => {
        return res.data;
      });
  }
);

export const deletePosts = createAsyncThunk("posts/deletePosts", async (id) => {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (response?.status === 200) return id;
    return `${response.status} : ${response.statusText}`;
  } catch (error) {
    return error.message;
  }
});

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
    [updatePosts.fulfilled]: (state, action) => {
      const row = action.payload;
      const newData = [...current(state).data];
      const index = newData.findIndex((item) => action.payload.id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      }
      state.data = newData;
    },
    [deletePosts.fulfilled]: (state, action) => {
      const newPosts = current(state).data.filter(
        (post) => post.id !== action.payload
      );
      state.data = newPosts;
    },
  },
});

export default postsSlice.reducer;
