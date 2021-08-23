import React, { useState } from "react";
import db from "../../firebase";

import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import avatarImage from "../../Images/tweetbox-avatar.png";

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  // console.log(tweetMessage);
  // console.log(tweetImage);

  const sendTweet = (e) => {
    e.preventDefault();

    // Posting input data to firebase DB as a new document
    db.collection("posts").add({
      avatarImg: "",
      displayName: "Ahmad Affan",
      image: tweetImage,
      text: tweetMessage,
      userName: "affann_12",
      verified: false,
    });

    setTweetMessage("");
  };

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
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Optional: Enter image URL"
          className="tweetBox__imageInput py-3 text-sm outline-none"
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
        />
        <Button
          variant="outlined"
          className="feed__tweet__button w-24"
          type="submit"
          onClick={sendTweet}
        >
          Tweet
        </Button>
      </form>
    </div>
  );
};

export default TweetBox;
