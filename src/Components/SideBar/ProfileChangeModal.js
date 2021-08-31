import React, { useRef, useState, useEffect } from "react";
import db, { auth } from "../../firebase";
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

  //Redux
  const sliceDispatch = useDispatch();
  //   const currentUserID = auth.currentUser.uid;

  const currentUser = useSelector((state) => JSON.parse(state.user));
  const currentUserID = useSelector((state) => state.userId);
  const loggedIn = useSelector((state) => state.isLoggedIn);

  console.log(loggedIn);

  useEffect(() => {
    updateOldTweets();
  }, []);

  //Here I want to change all the data inside the firestore db, so that when a user changes their username/photoURL, the new changes are also visible and apply to their old tweets. First, I retrieve all tweets that match the currentUserID
  const retrieveOldTweets = async (currentUserID) => {
    // Empty Array for tweets returned by query
    const tweetsQueried = [];

    // Create a reference to the cities collection
    var tweetCollectionRef = db.collection("posts");

    //Create a query against the collection and fetch
    await tweetCollectionRef
      .where("userId", "==", `${currentUserID}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((tweet) => {
          let currentId = tweet.id;
          let tweetObj = { ...tweet.data(), ["docId"]: currentId };
          // Push each matched-tweet to array
          tweetsQueried.push(tweetObj);
        });
      })
      .catch((error) => console.log(error));
    // Return array
    return tweetsQueried;
  };

  // Now, after retreiving all matching tweets from user, I now "set"/change their displayName and photoURL
  const updateOldTweets = async () => {
    const tweetsQueried = await retrieveOldTweets(currentUserID);

    // Here, update our new values
    tweetsQueried.forEach((tweet) => {
      db.collection("posts")
        .doc(`${tweet.docId}`)
        .update("displayName", `${currentUser.displayName}`);
      db.collection("posts")
        .doc(`${tweet.docId}`)
        .update("photoURL", `${currentUser.photoURL}`);
      db.collection("posts")
        .doc(`${tweet.docId}`)
        .update("avatarImg", `${currentUser.photoURL}`);
    });
  };

  // Triggered by changeProfile button onClick
  const changeProfile = (e) => {
    e.preventDefault();

    setLoading(true);
    auth.currentUser
      .updateProfile({
        displayName: userNameRef.current.value
          ? userNameRef.current.value
          : auth.currentUser.displayName,
        photoURL: photoURLRef.current.value
          ? photoURLRef.current.value
          : auth.currentUser.photoURL,
      })
      .then(() => {
        const currentuser = auth.currentUser;

        // Add currentuser's data to Redux global storage
        sliceDispatch(setUser(JSON.stringify(currentuser)));
        sliceDispatch(setIsLoggedIn(1));
        sliceDispatch(setUserId(currentuser.uid));
      })
      .catch((error) => setError(error.message));
    setError("");
    setLoading(false);
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

        <form action="" onSubmit={changeProfile}>
          <label className="signUpLabel">Change Display Name</label>
          <input
            type="text"
            name="username"
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
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileChangeModal;
