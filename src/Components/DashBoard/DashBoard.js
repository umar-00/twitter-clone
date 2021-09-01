import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

import {
  setUser,
  setIsLoggedIn,
  setUserId,
} from "../../Redux/Slices/userGoogleAuthSlice";
import { useDispatch } from "react-redux";

import SideBar from "../SideBar/SideBar";
import Feed from "../Feed/Feed";
import Widgets from "../Widgets/Widgets";
import Loader from "../Loader/Loader";

const DashBoard = () => {
  const sliceDispatch = useDispatch();
  const [loading, setLoading] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        console.log("Succesfully logged in!");
        setLoading(false);
      } else {
        console.log("User is now logged out");
      }
    });
  }, []);

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
  };

  return !loading ? (
    <div
      className={`app flex flex-col mobile:flex-row justify-center max-w-screen-2xl mx-auto h-screen w-screen`}
    >
      <SideBar onLogOutClick={signOut} />
      <Feed />
      <Widgets />
    </div>
  ) : (
    <Loader />
  );
};

export default DashBoard;
