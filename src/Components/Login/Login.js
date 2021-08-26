import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
// import { actionTypes } from "../../reducer";
import { useHistory } from "react-router-dom";
import {
  setUser,
  setIsLoggedIn,
  setUserId,
} from "../../Redux/Slices/userAuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const sliceDispatch = useDispatch();
  // const userAuth = useSelector((state) => state.userAuth);
  const history = useHistory();

  // const [stateUser, setStateUser] = useState();
  // const [{ user, isLoggedIn }, dispatch] = useStateValue();

  // console.log("Boolean from login:", isLoggedIn);
  // console.log("User from login:", user);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // var uid = user.uid;
  //       // console.log("Listening: logged in");
  //       console.log("Listening:", user.displayName);

  //       dispatch({
  //         type: actionTypes.SET_USER,
  //         user: user,
  //       });
  //       dispatch({
  //         type: actionTypes.SET_USERID,
  //         userId: user.uid,
  //       });
  //       // console.log("mutating state, pushing history");
  //       // console.log("From login page:", user);
  //       // history.push("/");

  //       // console.log("")
  //       // ...
  //     } else {
  //       console.log("User is logged out");
  //       // User is signed out
  //       // ...
  //     }
  //   });

  //   // authObserver();

  //   // return unsubscribe;
  // }, []);

  // Triggered by SignIn button onClick
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        sliceDispatch(setUser(JSON.stringify(result.user)));
        sliceDispatch(setIsLoggedIn(1));
        sliceDispatch(setUserId(result.user.uid));

        // dispatch({
        //   type: actionTypes.SET_USER,
        //   user: result.user,
        // });

        // dispatch({
        //   type: actionTypes.SET_USERID,
        //   userId: result.user.uid,
        // });
        //   console.log("mutating state, pushing history");
        //   console.log("From login page:", result.user);
        history.push("/");
      })
      .catch((error) => alert(error.message));

    // console.log("hello");
  };

  return (
    <div className="login flex items-center bg-gray-100 w-screen h-screen">
      <div className="login__container flex flex-col bg-white items-center m-auto w-2/6 rounded-xl border-2 shadow-lg p-8">
        <img
          src="http://static.dezeen.com/uploads/2012/06/dezeen_twitter-bird.gif"
          alt=""
          className="w-36"
        />
        <div className="login__text ">
          <p className="text-center text-2xl font-bold">
            Sign in to Twitter (clone)
          </p>
        </div>

        <Button
          variant="outlined"
          className="sidebar__tweet__button"
          fullWidth
          onClick={signIn}
        >
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
