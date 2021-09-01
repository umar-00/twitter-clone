import React, { useRef, useState, useEffect } from "react";
import db, { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import {
  setUser,
  setIsLoggedIn,
  setUserId,
} from "../../Redux/Slices/userGoogleAuthSlice";
import { FaExclamationCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import "./ProfileChangeModal.css";

const ProfileChangeModal = ({ show, onClose }) => {
  const userNameRef = useRef();
  const photoURLRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const [tweetsMatched, setTweetsMatched] = useState([]);

  //Redux
  const sliceDispatch = useDispatch();
  const currentUser = useSelector((state) => JSON.parse(state.user));
  const currentUserID = useSelector((state) => state.userId);
  const loggedIn = useSelector((state) => state.isLoggedIn);

  // console.log(currentUser);
  console.log(loggedIn);

  const changeProfile = async () => {
    console.log("entering changeProfile()");
    // console.log("name before changeProfile(): ", currentUser.displayName);
    // setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: userNameRef.current.value
        ? userNameRef.current.value
        : auth.currentUser.displayName,
      photoURL: photoURLRef.current.value
        ? photoURLRef.current.value
        : auth.currentUser.photoURL,
    })
      .then(() => {
        const currentuser = auth.currentUser;
        // console.log("Current User inside then(): ", currentuser.displayName);

        // Add currentuser's data to Redux global storage
        sliceDispatch(setUser(JSON.stringify(currentuser)));
        sliceDispatch(setIsLoggedIn(1));
        sliceDispatch(setUserId(currentuser.uid));
        // console.log("newly changed name is: ", currentuser.displayName);
        return currentuser;
        // return currentuser;
        // console.log("name after changeProfile(): ", currentUser.displayName);
      })
      .then((newUser) => {
        console.log("from 2nd then statement", newUser.displayName);
        updateOldTweets(newUser).catch((error) => console.log(error));
        console.log("exiting changeProfile()");
      })
      .catch((error) => setError(error));

    // return currentuser.displayName;
  };

  //Here I want to change all the data inside the firestore db, so that when a user changes their username/photoURL, the new changes are also visible and apply to their old tweets. First, I retrieve all tweets that match the currentUserID
  const retrieveOldTweets = async (currentUserID) => {
    // Empty Array for tweets returned by query
    const tweetsQueried = [];

    const q = query(
      collection(db, "posts"),
      where("userId", "==", `${currentUserID}`)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((tweet) => {
      let currentId = tweet.id;
      let tweetObj = { ...tweet.data(), ["docId"]: currentId };
      // Push each matched-tweet to array
      tweetsQueried.push(tweetObj);
    });
    return tweetsQueried;
    // setTweetsMatched(tweetsQueried);
  };

  // console.log(tweetsMatched);

  // After retreiving all matching tweets from user, I now update their displayName and photoURL inside the Firebase db
  const updateOldTweets = async (newUser) => {
    const tweetsQueried = await retrieveOldTweets(currentUserID).catch(
      (error) => console.log(error)
    );
    console.log("Entering updateOldTweets");

    // Here, update our new values
    // tweetsMatched.forEach(async (tweet) => {
    // console.log(tweetsQueried);
    tweetsQueried.forEach(async (tweet) => {
      const tweetRef = doc(db, "posts", `${tweet.docId}`);
      // console.log("name from update tweet function", currentUser.displayName);
      await updateDoc(tweetRef, {
        displayName: newUser.displayName,
        photoURL: newUser.photoURL,
        avatarImg: newUser.photoURL,
        userName: newUser.displayName.slice(0, 4),
      });
    });
  };

  // Triggered by changeProfile button onClick
  const handleSubmit = async (e) => {
    e.preventDefault();

    await changeProfile();
    // await updateOldTweets();

    // changeProfile().then(() => {
    //   // console.log(currentuser);
    //   updateOldTweets();
    // });
    // await updateOldTweets();
    setError("");
    // setLoading(false);
    onClose();
    // await updateOldTweets().catch((error) => console.log(error));
  };

  if (!show) {
    return null;
  }

  return (
    <div className="profileChangeModalContainer mb-8" onClick={onClose}>
      <div
        className="signUpModalContent flex flex-col bg-white m-auto w-5/6 max-w-2xl rounded-xl shadow-lg px-8 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="bg-white text-2xl mb-4 mt-0 font-bold">
          Change your account details, choose atleast one
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

        <form action="" onSubmit={handleSubmit}>
          <label className="signUpLabel">Change Display Name</label>
          <input
            type="text"
            name="username"
            minLength="4"
            placeholder="User Name"
            className="signUpInput"
            ref={userNameRef}
          />

          <label className="signUpLabel">Change Profile Photo URL</label>
          <input
            type="text"
            name="photoUrl"
            placeholder="Photo URL"
            className="signUpInput"
            ref={photoURLRef}
          />

          <input
            type="submit"
            value="Submit Changes"
            className="submitButton"
            // disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileChangeModal;
