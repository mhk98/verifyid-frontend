import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myPostApi = createApi({
  reducerPath: "myPostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://verifyid-backend.onrender.com/api/v1/",
    // baseUrl: "https://createabit-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["myPosts"], // Define the tag type
  endpoints: (build) => ({
    createmyPost: build.mutation({
      query: ({ id, data }) => ({
        url: `/myPost/create-myPost/${id}`,
        method: "myPost",
        body: data,
      }),
      invalidatesTags: ["myPosts"],
    }),

    deletemyPost: build.mutation({
      query: (id) => ({
        url: `/mypost/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myPosts"],
    }),
    editmyPostData: build.mutation({
      query: ({ id, data }) => ({
        url: `/mypost/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["myPosts"],
    }),

    getSinglemyPost: build.query({
      query: (id) => ({
        url: `/mypost/${id}`,
      }),
      invalidatesTags: ["myPosts"],
    }),

    getAllmyPost: build.query({
      query: (id) => ({
        url: `/mypost/${id}`,
      }),
      providesTags: ["myPosts"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const { useGetAllmyPostQuery } = myPostApi;