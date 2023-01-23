import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const ApiSlice = createApi({
  reducerPath: 'ApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    addNewPost: builder.mutation({
      query: (payload) => ({
        url: '/posts',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
})
export const { useGetPostsQuery, useAddNewPostMutation } = ApiSlice