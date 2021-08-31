import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useHistory } from "react-router-dom";
import {
  setUser,
  setIsLoggedIn,
  setUserId,
} from "../../Redux/Slices/userGoogleAuthSlice";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import SignUpModal from "../SignUpModal/SignUpModal";
import "./Login.css";

const Login = () => {
  const sliceDispatch = useDispatch();
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
  const history = useHistory();
  console.log(signUpModalIsOpen);

  // Triggered by signInByGoogle button onClick
  const signInByGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        sliceDispatch(setUser(JSON.stringify(result.user)));
        sliceDispatch(setIsLoggedIn(1));
        sliceDispatch(setUserId(result.user.uid));
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signUp flex flex-col items-center bg-gray-100 w-screen h-screen">
      <div className="signUp__container  flex flex-col bg-white items-center m-auto w-5/6 max-w-xl rounded-xl shadow-lg p-8">
        <img
          src="http://static.dezeen.com/uploads/2012/06/dezeen_twitter-bird.gif"
          alt=""
          className="w-24 sm:w-36"
        />
        <div className="signUp__text">
          <p className="text-center sm:text-2xl font-bold">
            Sign in to Twitter (clone)
          </p>
        </div>

        <Button
          variant="outlined"
          className="sidebar__tweet__button"
          fullWidth
          onClick={() => setSignUpModalIsOpen(true)}
        >
          <p className="ml-2">Sign Up With Email</p>
        </Button>
        <SignUpModal
          show={signUpModalIsOpen}
          onClose={() => setSignUpModalIsOpen(false)}
        />
        <Button
          variant="outlined"
          className="sidebar__tweet__button"
          fullWidth
          onClick={signInByGoogle}
        >
          <FcGoogle size={30} />
          <p className="ml-2">Sign Up/In With Google</p>
        </Button>
      </div>
    </div>
  );
};

export default Login;
