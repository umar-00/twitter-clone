import React, { useState } from "react";
import db from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
// import firebase from "firebase";
import { serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
// import avatarImage from "../../Images/tweetbox-avatar.png";

const TweetBox = ({ avatarImage, displName }) => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const userID = useSelector((state) => state.userId);

  const sendTweet = (e) => {
    e.preventDefault();

    const addDocumentToFirebase = async () => {
      const docRef = await addDoc(collection(db, "posts"), {
        avatarImg: avatarImage,
        displayName: displName,
        image: tweetImage,
        text: tweetMessage,
        userName: displName.slice(0, 4),
        verified: true,
        createdAt: serverTimestamp(),
        userId: userID,
      });
      console.log("Document written with ID: ", docRef.id);
    };

    addDocumentToFirebase().catch((error) => console.log(error));

    // Posting input data to firebase DB as a new document
    // db.collection("posts").add({
    //   avatarImg: avatarImage,
    //   displayName: displName,
    //   image: tweetImage,
    //   text: tweetMessage,
    //   userName: displName.slice(0, 4),
    //   verified: true,
    //   createdAt: timestamp(),
    //   userId: userID,
    // });

    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox border-b-8 mt-3">
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
