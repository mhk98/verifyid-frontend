import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userNotificationApi = createApi({
  reducerPath: "userNotificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://doctrack-server.onrender.com/api/v1/",
    // baseUrl: "https://createabit-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["userNotifications"], // Define the tag type
  endpoints: (build) => ({
    createUserNotification: build.mutation({
      query: ({ id, data }) => ({
        url: `/userNotification/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userNotifications"],
    }),

    deleteUserNotification: build.mutation({
      query: (id) => ({
        url: `/userNotification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["userNotifications"],
    }),
    editUserNotificationData: build.mutation({
      query: ({ id, data }) => ({
        url: `/userNotification/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["userNotifications"],
    }),

    getSingleUserNotification: build.query({
      query: (id) => ({
        url: `/userNotification/${id}`,
      }),
    }),

    getAllUserNotification: build.query({
      query: (id) => ({
        url: `/userNotification/${id}`,
      }),
      providesTags: ["userNotifications"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateUserNotificationMutation,
  useGetAllUserNotificationQuery,
  useGetSingleUserNotificationQuery,
  useDeleteUserNotificationMutation,
  useEditUserNotificationDataMutation,
} = userNotificationApi;
