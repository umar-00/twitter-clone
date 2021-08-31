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
  const passwordConfirmRef = useRef();
  const userNameRef = useRef();
  const photoURLRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Redux
  const sliceDispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => JSON.parse(state.user));
  console.log(user);

  // Triggered by signInByGoogle button onClick
  const signInByEmail = (e) => {
    e.preventDefault();

    console.log("Signing in process...");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    } else {
      setLoading(true);

      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((result) => {
          console.log("Updating profile");
          console.log("userRef ---->", userNameRef.current.value);
          // Add username to newly signed up profile
          return result.user.updateProfile({
            displayName: userNameRef.current.value,
            photoURL: photoURLRef.current.value,
          });
        })
        .then(() => {
          // once updateProfile()'s promise is resolved, do the following:
          const currentuser = auth.currentUser;
          console.log("Signing in, current user is:", currentuser);
          // Add currentuser's data to Redux global storage
          sliceDispatch(setUser(JSON.stringify(currentuser)));
          sliceDispatch(setIsLoggedIn(1));
          sliceDispatch(setUserId(currentuser.uid));
          history.push("/");
        })
        .catch((error) => setError(error.message));
    }
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
          Create your account
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

        <form action="" onSubmit={signInByEmail}>
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
          <label className="signUpLabel">Password Confirmation</label>
          <input
            type="password"
            id="passwordConfirmSignUp"
            name="passwordConfirmSignUp"
            required
            placeholder="Password"
            className="signUpInput"
            ref={passwordConfirmRef}
          />
          <label className="signUpLabel">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="User Name"
            className="signUpInput"
            ref={userNameRef}
          />
          <label className="signUpLabel">
            Add Profile Photo URL (optional)
          </label>
          <input
            type="text"
            id="photoUrl"
            name="photoUrl"
            placeholder="Photo URL"
            className="signUpInput"
            ref={photoURLRef}
          />

          <input
            type="submit"
            value="Sign Up"
            className="submitButton"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
