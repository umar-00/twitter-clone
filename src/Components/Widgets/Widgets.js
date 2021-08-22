import React from "react";
import "./Widgets.css";
import SearchIcon from "@material-ui/icons/Search";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";

const Widgets = () => {
  return (
    <div className="widgets__container p-5 w-5/12 xl:4/12">
      <div className="widgets__input flex bg-secondary border-2 p-2 rounded-full">
        <SearchIcon className="stroke-current text-lightgrayfont cursor-pointer font-bold" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-secondary ml-2 flex-1 placeholder-lightgrayfont outline-none"
        />
      </div>

      <div className="widgets__widgetsContainer mt-3 bg-neutral p-5 rounded-2xl">
        <h1 className="text-xl font-bold">What's Happening</h1>
        <TwitterTweetEmbed tweetId="858551177860055040" />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="ImranKhanPTI"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
};

export default Widgets;
