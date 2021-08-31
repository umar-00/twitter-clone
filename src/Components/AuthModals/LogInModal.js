import React, { useRef, useState } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setUser,
  setIsLoggedIn,
  setUserId,
} from "../../Redux/Slices/userGoogleAuthSlice";
import { FaExclamationCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import "./SignUpModal.css";

const SignUpModal = ({ show, onClose }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Redux
  const sliceDispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => JSON.parse(state.user));
  console.log(user);
  console.log(error);

  // Triggered by signInByGoogle button onClick
  const logInByEmail = (e) => {
    e.preventDefault();

    console.log("Logging in process...");
    setLoading(true);
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((result) => {
        const currentuser = result.user;
        console.log("Signing in, current user is:", currentuser);
        // Add currentuser's data to Redux global storage
        sliceDispatch(setUser(JSON.stringify(currentuser)));
        sliceDispatch(setIsLoggedIn(1));
        sliceDispatch(setUserId(currentuser.uid));
        history.push("/");
      })
      .catch((error) => setError(error.message));
    setError("");
    setLoading(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="signUpModalContainer mb-8" onClick={onClose}>
      <div
        className="signUpModalContent flex flex-col bg-white m-auto w-5/6 max-w-2xl rounded-xl shadow-lg px-8 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="bg-white text-2xl mb-4 mt-0 font-bold">
          Log in to your account
        </p>

        {error && (
          <div className="errorDiv flex items-center bg-red-500 mb-3 p-2 text-white">
            <FaExclamationCircle
              style={{
                display: "inline",
                marginRight: "5px",
                // marginBottom: "2px",
              }}
              size={20}
            />
            <p className="text-md">{error}</p>
          </div>
        )}

        <form action="" onSubmit={logInByEmail}>
          <label className="signUpLabel">Email</label>
          <input
            type="email"
            id="emailSignUp"
            name="emailSignUp"
            required
            // value=""
            placeholder="Email"
            className="signUpInput"
            ref={emailRef}
          />
          <label className="signUpLabel">Password</label>
          <input
            type="password"
            id="passwordSignUp"
            name="passwordSignUp"
            required
            placeholder="Password"
            className="signUpInput"
            ref={passwordRef}
          />

          <input
            type="submit"
            value="Log In"
            className="submitButton"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
