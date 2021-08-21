import React from "react";

// Icons and CSS
import "./SideBar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Button } from "@material-ui/core";

//Components
import SideBarOption from "../SideBarOption/SideBarOption";

const SideBar = () => {
  return (
    <div className="sidebar__container p-2 border-2 p-10">
      <TwitterIcon className="twitterIcon" fontSize="large" />
      <SideBarOption active Icon={HomeIcon} text={"Home"} />
      <SideBarOption Icon={SearchIcon} text={"Explore"} />
      <SideBarOption Icon={NotificationsNoneIcon} text={"Notifications"} />
      <SideBarOption Icon={MailOutlineIcon} text={"Messages"} />
      <SideBarOption Icon={BookmarkBorderIcon} text={"Bookmarks"} />
      <SideBarOption Icon={ListAltIcon} text={"Lists"} />
      <SideBarOption Icon={PermIdentityIcon} text={"Profile"} />
      <SideBarOption Icon={MoreHorizIcon} text={"More"} />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
};

export default SideBar;
