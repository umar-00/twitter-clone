import React from "react";

import avatarImage from "../../Images/tweetbox-avatar.png";
import { Avatar } from "@material-ui/core";
import { FiMessageCircle } from "react-icons/fi";
import { GoVerified } from "react-icons/go";
import { FiRepeat } from "react-icons/fi";
import { BsHeart } from "react-icons/bs";
import { BsBoxArrowUp } from "react-icons/bs";

const TweetPost = () => {
  return (
    <div className="tweetPost items-start flex border-b-2 mt-1 px-3 mb-3">
      <Avatar
        src={avatarImage}
        style={{
          height: "50px",
          width: "50px",
          marginTop: "5px",
        }}
      />
      <div className="tweetpost__body ml-3 flex-1">
        <div className="tweetpost__header flex items-center">
          <span className="font-medium">Name</span>
          <span className="">
            <GoVerified className="inline fill-current text-primary ml-1 mr-2" />
          </span>
          <span className="text-gray-500">@username</span>
        </div>
        <div className="tweetpost_content">
          <p className="py-1 pb-3">
            Giving standup comedy a go. Open mic starts at 7, hit me up if you
            want ticket. Lorem ipsum dolor sit amet consectetur adipisicing elit
            lorem, in. #heregoesnothing
          </p>
          <img
            src="https://media.giphy.com/media/gvlzz2kUlk05q/giphy.gif"
            alt="tweet_img"
            className="rounded-2xl mb-3 w-full"
          />
        </div>
        <div className="tweetpost_icons flex justify-between py-2 mb-3">
          <FiMessageCircle
            style={{ fontSize: "24px" }}
            className="stroke-current text-gray-500 cursor-pointer font-bold"
          />
          <FiRepeat
            style={{ fontSize: "24px" }}
            className="stroke-current text-gray-500 cursor-pointer font-bold"
          />
          <BsHeart
            style={{ fontSize: "24px" }}
            className="stroke-current text-gray-500 cursor-pointer font-bold"
          />
          <BsBoxArrowUp
            style={{ fontSize: "24px" }}
            className="stroke-current text-gray-500 cursor-pointer font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default TweetPost;
