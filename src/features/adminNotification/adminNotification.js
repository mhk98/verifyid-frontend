import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminNotificationApi = createApi({
  reducerPath: "adminNotificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    // baseUrl: "https://createabit-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["adminNotifications"], // Define the tag type
  endpoints: (build) => ({
    createAdminNotification: build.mutation({
      query: ({ id, data }) => ({
        url: `/adminNotification/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["adminNotifications"],
    }),

    deleteAdminNotification: build.mutation({
      query: (id) => ({
        url: `/adminNotification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["adminNotifications"],
    }),
    editAdminNotificationData: build.mutation({
      query: ({ id, data }) => ({
        url: `/adminNotification/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["adminNotifications"],
    }),

    getSingleAdminNotification: build.query({
      query: (id) => ({
        url: `/adminNotification/${id}`,
      }),
    }),

    getAllAdminNotification: build.query({
      query: () => ({
        url: "/adminNotification",
      }),
      providesTags: ["adminNotifications"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateAdminNotificationMutation,
  useGetAllAdminNotificationQuery,
  useGetSingleAdminNotificationQuery,
  useDeleteAdminNotificationMutation,
  useEditAdminNotificationDataMutation,
} = adminNotificationApi;
