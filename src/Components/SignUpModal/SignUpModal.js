import React, { useRef, useState } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  setUser,
  setIsLoggedIn,
  setUserId,
} from "../../Redux/Slices/userGoogleAuthSlice";
import { useDispatch } from "react-redux";
import "./SignUpModal.css";

const SignUpModal = ({ show, onClose }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const userNameRef = useRef();
  const [loading, setLoading] = useState(false);

  //Redux
  const sliceDispatch = useDispatch();
  const history = useHistory();
  //   const user = useSelector((state) => JSON.parse(state.user));
  //   console.log(user);

  const updateEmailProfile = () => {
    var currentuser = auth.currentUser;
    console.log("Updating profile");
    console.log(currentuser);
    console.log("userRef ---->", userNameRef.current.value);
    return currentuser.updateProfile({
      displayName: userNameRef.current.value,
    });
  };

  // Triggered by signInByGoogle button onClick
  const signInByEmail = (e) => {
    e.preventDefault();

    console.log("Signing in process...");

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return alert("Passwords do not match");
    } else {
      setLoading(true);

      auth
        .createUserWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .then((result) => {
          updateEmailProfile();
          console.log(result);
          sliceDispatch(setUser(JSON.stringify(result.user)));
          sliceDispatch(setIsLoggedIn(1));
          sliceDispatch(setUserId(result.user.uid));
          //   history.push("/");
          setLoading(false);
          console.log("Sign in successful!");
          console.log("This is the user:", result.user);
          console.log(
            "This is the user's display name:",
            result.user.displayName
          );
        })
        .catch((error) => console.log("Error happened:", error.message));
    }
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
        <p className="bg-white text-3xl mb-4 mt-0 font-bold">
          Create your account
        </p>

        <form
          action=""
          onSubmit={signInByEmail}
          //   onSubmit={(e) => {
          // e.preventDefault();
          // if (
          //   passwordRef.current.value !== passwordConfirmRef.current.value
          // ) {
          //   return alert("Passwords do not match, please try again");
          // }
          // console.log("Email: ", emailRef.current.value);
          // console.log("Password: ", passwordRef.current.value);
          // console.log(
          //   "Password Confirmed: ",
          //   passwordConfirmRef.current.value
          // );
          // console.log("User Name: ", userNameRef.current.value);
          //   }}
        >
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
            // value=""
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
            // value=""
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
            // value=""
            placeholder="User Name"
            className="signUpInput"
            ref={userNameRef}
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
