import { adminNotificationApi } from "../features/adminNotification/adminNotification";
import { commentApi } from "../features/comment/comment";
import { myPostApi } from "../features/myPost/myPost";
import { postApi } from "../features/post/post";
import { replyApi } from "../features/reply/reply";
import { userApi } from "../features/user/user";
import { userNotificationApi } from "../features/userNotification/userNotification";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [replyApi.reducerPath]: replyApi.reducer,
    [userNotificationApi.reducerPath]: userNotificationApi.reducer,
    [adminNotificationApi.reducerPath]: adminNotificationApi.reducer,
    [myPostApi.reducerPath]: myPostApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      commentApi.middleware,
      replyApi.middleware,
      userNotificationApi.middleware,
      adminNotificationApi.middleware,
      myPostApi.middleware,
      userApi.middleware
    ),
});

export default store;
