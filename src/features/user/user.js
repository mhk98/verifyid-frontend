import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://verifyid-backend.onrender.com/api/v1/",
    // baseUrl: "https://createabit-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["users"], // Define the tag type
  endpoints: (build) => ({
    createUser: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    editUserData: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    // getSingleuser: build.query({
    //   query: (id) => ({
    //     url: `/user/${id}`,
    //   }),
    // }),

    getAllUser: build.query({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["users"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useEditUserDataMutation,
} = userApi;
