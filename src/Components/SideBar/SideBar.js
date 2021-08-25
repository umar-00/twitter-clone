import React from "react";
import { Link } from "react-router-dom";

// Icons and CSS
import "./SideBar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import { FaHashtag } from "react-icons/fa";
// import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { ImSwitch } from "react-icons/im";
import { Button } from "@material-ui/core";

//Components
import SideBarOption from "../SideBarOption/SideBarOption";

const SideBar = ({ onLogOutClick }) => {
  return (
    <>
      {/* The following div is visible on screen-width > 500px (desktop/tablet use) */}
      <div className="sideBar__web__container flex-col items-center sidebar__container border-r-2 pt-4 px-3 hidden mobile:flex xl:items-start min-w-75px xl:block xl:px-10 w-1/12 xl:w-3/12">
        <TwitterIcon className="twitterIcon xl:ml-3 mb-4" fontSize="large" />
        <SideBarOption active Icon={HomeIcon} text={"Home"} />
        <SideBarOption Icon={PermIdentityIcon} text={"Profile"} />

        <SideBarOption
          Icon={ImSwitch}
          text={"Log Out"}
          reactIconsStyle={"mx-5"}
          onClick={onLogOutClick}
        />
        <SideBarOption
          Icon={FaHashtag}
          text={"Explore"}
          reactIconsStyle={"mx-5"}
        />
        <SideBarOption Icon={NotificationsNoneIcon} text={"Notifications"} />
        <SideBarOption Icon={MailOutlineIcon} text={"Messages"} />
        <SideBarOption Icon={BookmarkBorderIcon} text={"Bookmarks"} />
        <SideBarOption Icon={ListAltIcon} text={"Lists"} />
        <SideBarOption Icon={MoreHorizIcon} text={"More"} />

        <Button variant="outlined" className="sidebar__tweet__button" fullWidth>
          Tweet
        </Button>
      </div>

      {/* The following div is visible on screen-width > 500px (mobile use) */}
      <div className="sideBar__mob__container flex order-last z-50 border-t-2 justify-between mobile:hidden">
        <SideBarOption active Icon={HomeIcon} text={"Home"} />
        <SideBarOption
          hashTagStyle={"mx-5"}
          Icon={FaHashtag}
          text={"Explore"}
        />
        <SideBarOption Icon={NotificationsNoneIcon} text={"Notifications"} />
        <SideBarOption Icon={MailOutlineIcon} text={"Messages"} />
      </div>
    </>
  );
};

export default SideBar;
