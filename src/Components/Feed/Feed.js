import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import db, { auth } from "../../firebase";
import FlipMove from "react-flip-move";
import { actionTypes } from "../../reducer";

//CSS and icons
import "./Feed.css";
import { HiOutlineSparkles } from "react-icons/hi";
import TweetBox from "../TweetBox/TweetBox";
import TweetPost from "../TweetPost/TweetPost";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [{ user, token, userId }, dispatch] = useStateValue();

  useEffect(() => {
    // Add ALL current and newly updated documents on firebase DB to "posts" state
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => [doc.id, doc.data()]));
      });

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
          type: actionTypes.SET_USERID,
          userId: user.uid,
        });
        // console.log("mutating state, pushing history");
        // console.log("From login page:", user);
        // history.push("/");

        // console.log("")
        // ...
      } else {
        console.log("User is logged out");
        // User is signed out
        // ...
      }
    });
  }, []);

  console.log("User from login:", user);
  console.log("Token from login:", token);
  console.log("UserId from login:", userId);

  return (
    <div className="feed__container border-r-2 w-full sm:mr-16 tablet:mr-0 sm:w-8/12 tablet:w-6/12">
      {/* <div className="feed__container border-r-2 w-11/12 md:w-6/12"> */}
      {/* Header */}
      <div className="flex items-center justify-between z-50 feed__header sticky top-0 bg-white px-3 border-b-2">
        <h1 className="font-bold text-2xl font-sans py-4">Home</h1>
        <HiOutlineSparkles className="text-2xl stroke-current text-primary" />
      </div>

      <TweetBox avatarImage={user?.photoURL} displName={user?.displayName} />
      <FlipMove>
        {/* Renders TweetPost components. post[0] is doc.id, post[1] is 
        doc.data() object, both fetched from DB in useEffect above*/}
        {posts.map((post) => (
          <TweetPost
            key={post[0]}
            avatarImg={post[1].avatarImg}
            displayName={post[1].displayName}
            userName={post[1].userName}
            verified={post[1].verified}
            text={post[1].text}
            image={post[1].image}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default Feed;
