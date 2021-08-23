import React, { useState, useEffect } from "react";
import db from "../../firebase";
import FlipMove from "react-flip-move";

//CSS and icons
import "./Feed.css";
import { HiOutlineSparkles } from "react-icons/hi";
import TweetBox from "../TweetBox/TweetBox";
import TweetPost from "../TweetPost/TweetPost";
import avatarImage from "../../Images/tweetbox-avatar.png";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Add ALL current and newly updated documents on firebase DB to "posts" state
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => [doc.id, doc.data()]));
    });
  }, []);

  // console.log(posts);

  return (
    <div className="feed__container border-r-2 w-full sm:mr-16 tablet:mr-0 sm:w-8/12 tablet:w-6/12">
      {/* <div className="feed__container border-r-2 w-11/12 md:w-6/12"> */}
      {/* Header */}
      <div className="flex items-center justify-between z-50 feed__header sticky top-0 bg-white px-3 border-b-2">
        <h1 className="font-bold text-2xl font-sans py-4">Home</h1>
        <HiOutlineSparkles className="text-2xl stroke-current text-primary" />
      </div>

      <TweetBox />
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
