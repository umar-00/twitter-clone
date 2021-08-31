import React, { forwardRef } from "react";

import { Avatar } from "@material-ui/core";
import { FiMessageCircle } from "react-icons/fi";
import { GoVerified } from "react-icons/go";
import { FiRepeat } from "react-icons/fi";
import { BsHeart } from "react-icons/bs";
import { BsBoxArrowUp } from "react-icons/bs";

const TweetPost = forwardRef(
  ({ avatarImg, displayName, userName, verified, text, image }, ref) => {
    return (
      <div
        className="tweetPost items-start flex border-b-2 mt-1 px-3 pt-3"
        ref={ref}
      >
        <Avatar
          src={avatarImg}
          style={{
            height: "50px",
            width: "50px",
            marginTop: "5px",
          }}
        />
        <div className="tweetpost__body ml-3 flex-1">
          <div className="tweetpost__header flex items-center">
            <span className={`font-medium ${!verified && "mr-2"}`}>
              {displayName}
            </span>
            {verified && (
              <span className="">
                <GoVerified className="inline fill-current text-primary ml-1 mr-2" />
              </span>
            )}
            <span className="text-gray-500">@{userName}</span>
          </div>
          <div className="tweetpost_content">
            <p className="py-1 pb-3">{text}</p>
            <img src={image} alt="" className="rounded-2xl mb-3 w-full" />
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
  }
);

export default TweetPost;
