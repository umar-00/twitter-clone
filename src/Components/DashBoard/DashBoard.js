import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  setUser,
  setIsLoggedIn,
  setUserId,
} from "../../Redux/Slices/userGoogleAuthSlice";
import { useDispatch } from "react-redux";

import SideBar from "../SideBar/SideBar";
import Feed from "../Feed/Feed";
import Widgets from "../Widgets/Widgets";

const DashBoard = () => {
  const sliceDispatch = useDispatch();
  const user = useSelector((state) => JSON.parse(state.user));
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log("isLoggedIn from DashBaord:", isLoggedIn);

  const history = useHistory();

  console.log("testing user from dashboard:");

  useEffect(() => {
    auth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        console.log("Listening: logged in");
        console.log(loggedUser);
      } else {
        console.log("User is logged out");
        // User is signed out
        // ...
      }
    });
  }, []);

  // console.log("User from login:", user);
  // console.log("Boolean from login:", isLoggedIn);
  // console.log("UserId from login:", userId);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        sliceDispatch(setUser(null));
        sliceDispatch(setIsLoggedIn(0));
        sliceDispatch(setUserId(null));
        console.log("Signed out successfully");
        history.push("/login");
      })
      .catch((error) => {
        alert(error);
      });

    console.log("after signing out, user:", user);
  };

  return (
    <div
      className={`app flex flex-col mobile:flex-row justify-center max-w-screen-2xl mx-auto h-screen w-screen`}
    >
      <SideBar onLogOutClick={signOut} />
      <Feed />
      <Widgets />
    </div>
  );
};

export default DashBoard;
