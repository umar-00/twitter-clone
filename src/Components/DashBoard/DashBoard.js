import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

import SideBar from "../SideBar/SideBar";
import Feed from "../Feed/Feed";
import Widgets from "../Widgets/Widgets";

const DashBoard = () => {
  const [{ user }, dispatch] = useStateValue();

  const history = useHistory();

  console.log("testing dashboard");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // var uid = user.uid;
        // console.log("Listening: logged in");
        console.log("Listening:", user.displayName);

        dispatch({
          type: actionTypes.SET_USER,
          user: user,
        });
        dispatch({
          type: actionTypes.SET_ISLOGGEDIN,
          isLoggedIn: true,
        });
        dispatch({
          type: actionTypes.SET_USERID,
          userId: user.uid,
        });
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
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
        dispatch({
          type: actionTypes.SET_ISLOGGEDIN,
          isLoggedIn: false,
        });
        dispatch({
          type: actionTypes.SET_USERID,
          userId: null,
        });
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
