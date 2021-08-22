import React from "react";

//CSS and icons
import "./Feed.css";
import { HiOutlineSparkles } from "react-icons/hi";
import TweetBox from "../TweetBox/TweetBox";
import TweetPost from "../TweetPost/TweetPost";

const Feed = () => {
  return (
    <div className="feed__container border-r-2">
      {/* Header */}
      <div className="flex items-center justify-between feed__header sticky top-0 bg-white px-3">
        <h1 className="font-bold text-2xl font-sans z-50 py-4">Home</h1>
        <HiOutlineSparkles className="text-2xl stroke-current text-primary" />
      </div>

      <TweetBox />

      <TweetPost />
      <h3>abc</h3>
      <h3>abc</h3>
    </div>
  );
};

export default Feed;
