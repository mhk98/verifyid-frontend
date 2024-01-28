import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    // baseUrl: "https://createabit-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["post"], // Define the tag type
  endpoints: (build) => ({
    createPost: build.mutation({
      query: ({ id, data }) => ({
        url: `/post/create-post/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),

    deletePost: build.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
    editPostData: build.mutation({
      query: ({ id, data }) => ({
        url: `/post/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),

    getMyPost: build.query({
      query: (id) => ({
        url: `/post/myPost/${id}`,
      }),
      invalidatesTags: ["post"],
    }),
    getSinglePost: build.query({
      query: (id) => ({
        url: `/post/${id}`,
      }),
      invalidatesTags: ["post"],
    }),

    getAllPost: build.query({
      query: () => ({
        url: "/post",
      }),
      providesTags: ["post"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetSinglePostQuery,
  useGetAllPostQuery,
  useDeletePostMutation,
  useEditPostDataMutation,
  useGetMyPostQuery,
} = postApi;
