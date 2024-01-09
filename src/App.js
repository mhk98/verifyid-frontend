import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { Route, Routes } from "react-router-dom";
import PostCreation from "./Components/PostCreation/PostCreation";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import RequireAuth from "./Components/Auth/RequireAuth";
import { Toaster } from "react-hot-toast";
import Header from "./Components/Header/Header";
import AddPost from "./Components/Post/AddPost";
import MyPost from "./Components/Post/MyPost";
import Verify from "./Components/IdVerify/Verify";
import Dashboard from "./Components/Dashboard/Dashboard";
import Users from "./Components/Dashboard/Users";
import AdminNotification from "./Components/Notification/AdminNotification";
import UserNotification from "./Components/Notification/UserNotification";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <PostCreation />
              </RequireAuth>
            }
          />
          <Route
            path="/post/:id"
            element={
              <RequireAuth>
                <Verify />
              </RequireAuth>
            }
          />
          <Route
            path="/add-post"
            element={
              <RequireAuth>
                <AddPost />
              </RequireAuth>
            }
          />
          <Route
            path="/my-post"
            element={
              <RequireAuth>
                <MyPost />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin-notification"
            element={
              <RequireAuth>
                <AdminNotification />
              </RequireAuth>
            }
          />
          <Route
            path="/user-notification"
            element={
              <RequireAuth>
                <UserNotification />
              </RequireAuth>
            }
          />

          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard></Dashboard>
              </RequireAuth>
            }
          >
            <Route
              path="users"
              element={
                <RequireAuth>
                  <Users></Users>
                </RequireAuth>
              }
            ></Route>
          </Route>
        </Routes>
      </Provider>
      <Toaster />
    </div>
  );
};

export default App;