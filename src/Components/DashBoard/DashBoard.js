import React from "react";
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
