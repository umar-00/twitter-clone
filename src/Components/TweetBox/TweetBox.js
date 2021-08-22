import React from "react";

import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import avatarImage from "../../Images/tweetbox-avatar.png";

const TweetBox = () => {
  return (
    <div className="tweetBox border-b-8 mt-1">
      <form className="flex flex-col p-3">
        <div className="tweetBox__input flex justify-between">
          <Avatar src={avatarImage} style={{ height: "50px", width: "50px" }} />
          <input
            type="text"
            placeholder="What's happening?"
            className="ml-5 text-lg outline-none"
            style={{ flex: "1" }}
          />
        </div>
        <input
          type="text"
          placeholder="Optional: Enter image URL"
          className="tweetBox__imageInput py-3 text-sm outline-none"
        />
        <Button variant="outlined" className="feed__tweet__button w-24">
          Tweet
        </Button>
      </form>
    </div>
  );
};

export default TweetBox;
