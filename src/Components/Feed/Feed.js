import React from "react";

//CSS and icons
import "./Feed.css";
import { HiOutlineSparkles } from "react-icons/hi";
import TweetBox from "../TweetBox/TweetBox";
import TweetPost from "../TweetPost/TweetPost";

const Feed = () => {
  return (
    <div className="feed__container border-r-2 w-6/12 xl:5/12">
      {/* Header */}
      <div className="flex items-center justify-between z-50 feed__header sticky top-0 bg-white px-3 border-b-2">
        <h1 className="font-bold text-2xl font-sans py-4">Home</h1>
        <HiOutlineSparkles className="text-2xl stroke-current text-primary" />
      </div>

      <TweetBox />

      <TweetPost />
      <TweetPost />
      <TweetPost />
    </div>
  );
};

export default Feed;
