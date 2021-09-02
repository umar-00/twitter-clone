import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import db from "../../firebase";
import FlipMove from "react-flip-move";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";

//CSS and icons
import "./Feed.css";
import { HiOutlineSparkles } from "react-icons/hi";
import TweetBox from "../TweetBox/TweetBox";
import TweetPost from "../TweetPost/TweetPost";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Logged in user, from Redux globalstore in store.js
  const user = useSelector((state) => JSON.parse(state.user));

  useEffect(() => {
    // Add ALL current and newly updated documents on firebase DB to "posts" state
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    onSnapshot(
      q,
      (querySnapshot) => {
        setPosts(querySnapshot.docs.map((doc) => [doc.id, doc.data()]));
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="feed__container border-r-2 w-full sm:mr-16 tablet:mr-0 sm:w-8/12 tablet:w-6/12">
      <div className="flex items-center justify-between z-20 feed__header sticky top-0 bg-white px-3 border-b-2">
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
