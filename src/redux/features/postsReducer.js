import {createAsyncThunk , createSlice} from "@reduxjs/toolkit"
import axios from "axios"




export const getPosts = createAsyncThunk("posts/fetchPosts",async () =>{
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
    //  const data =await  axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
    //   return res.data
    // });
    return data;
}) 
 const initialState = {
loading : false,
data : [],
error :null,
 } 
export const postsSlice =createSlice({
    name :"posts",
    initialState,
    reducers : {},
    extraReducers : {
        [getPosts.pending] :(state,action) => {
state.loading=true;
        },
        [getPosts.fulfilled] :(state,action) => {
state.loading =false;
state.data =action.payload;
        },
        [getPosts.rejected] :(state,action) => {
            state.loading =false;
state.error = "error"
        }

    }
})



export default postsSlice.reducer;


