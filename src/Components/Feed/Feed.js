import React from "react";

//CSS and icons
import "./Feed.css";
import { HiOutlineSparkles } from "react-icons/hi";
import TweetBox from "../TweetBox/TweetBox";
import TweetPost from "../TweetPost/TweetPost";

const Feed = () => {
  return (
    <div className="feed__container border-r-2 w-full sm:mr-16 tablet:mr-0 sm:w-8/12 tablet:w-6/12">
      {/* <div className="feed__container border-r-2 w-11/12 md:w-6/12"> */}
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
