import React, { useState } from "react";

// Icons and CSS
import "./SideBar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { ImSwitch } from "react-icons/im";
import { Button } from "@material-ui/core";

//Components
import SideBarOption from "../SideBarOption/SideBarOption";
import ProfileChangeModal from "./ProfileChangeModal";

const SideBar = ({ onLogOutClick }) => {
  const [profileChangeModalIsOpen, setProfileChangeModalIsOpen] =
    useState(false);
  return (
    <>
      {/* The following div is visible on screen-width > 500px (desktop/tablet use) */}
      <div className="sideBar__web__container flex-col items-center sidebar__container border-r-2 pt-4 px-3 hidden mobile:flex xl:items-start min-w-75px xl:block xl:px-10 w-1/12 xl:w-3/12">
        <TwitterIcon className="twitterIcon xl:ml-3 mb-4" fontSize="large" />
        <SideBarOption active Icon={HomeIcon} text={"Home"} />
        <SideBarOption
          Icon={PermIdentityIcon}
          text={"Profile"}
          onClick={() => setProfileChangeModalIsOpen(true)}
        />
        <ProfileChangeModal
          show={profileChangeModalIsOpen}
          onClose={() => setProfileChangeModalIsOpen(false)}
        />
        <SideBarOption
          Icon={ImSwitch}
          text={"Log Out"}
          reactIconsStyle={"mx-5"}
          onClick={onLogOutClick}
        />
        <Button variant="outlined" className="sidebar__tweet__button" fullWidth>
          Tweet
        </Button>
      </div>

      {/* The following div is visible on screen-width > 500px (mobile use) */}
      <div className="sideBar__mob__container flex order-last sticky z-50 bottom-0 bg-white border-t-2 justify-between mobile:hidden">
        <SideBarOption active Icon={HomeIcon} text={"Home"} />
        <SideBarOption
          Icon={PermIdentityIcon}
          text={"Profile"}
          onClick={() => setProfileChangeModalIsOpen(true)}
        />

        <ProfileChangeModal
          show={profileChangeModalIsOpen}
          onClose={() => setProfileChangeModalIsOpen(false)}
        />
        <SideBarOption
          Icon={ImSwitch}
          text={"Log Out"}
          reactIconsStyle={"mx-5"}
          onClick={onLogOutClick}
        />
      </div>
    </>
  );
};

export default SideBar;
