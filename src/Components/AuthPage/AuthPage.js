import React, { useState } from "react";
import { auth, provider } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useHistory } from "react-router-dom";
import {
  setUser,
  setIsLoggedIn,
  setUserId,
} from "../../Redux/Slices/userGoogleAuthSlice";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@material-ui/core";
import SignUpModal from "../AuthModals/SignUpModal";
import LogInModal from "../AuthModals/LogInModal";
import { useSelector } from "react-redux";
import "./AuthPage.css";

const AuthPage = () => {
  const sliceDispatch = useDispatch();
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
  const [logInModalIsOpen, setLogInModalIsOpen] = useState(false);
  const history = useHistory();
  const loggedIn = useSelector((state) => state.isLoggedIn);
  console.log("logged in: ", loggedIn);

  // Triggered by signInByGoogle button onClick
  const signInByGoogle = () => {
    signInWithPopup(auth, provider)
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
          onClick={() => setLogInModalIsOpen(true)}
        >
          <p className="ml-2">Log In With Email</p>
        </Button>
        <LogInModal
          show={logInModalIsOpen}
          onClose={() => setLogInModalIsOpen(false)}
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

export default AuthPage;
