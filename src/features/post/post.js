import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    // baseUrl: "https://createabit-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["posts"], // Define the tag type
  endpoints: (build) => ({
    createPost: build.mutation({
      query: ({ id, data }) => ({
        url: `/post/create-post/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),

    deletePost: build.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
    editPostData: build.mutation({
      query: ({ id, data }) => ({
        url: `/post/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),

    getSinglePost: build.query({
      query: (id) => ({
        url: `/post/${id}`,
      }),
    }),

    getAllPost: build.query({
      query: () => ({
        url: "/post",
      }),
      invalidatesTags: ["posts"],

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
} = postApi;
