import React from "react";
import "./SideBarOption.css";

const SideBarOption = ({ active, Icon, text }) => {
  return (
    <div
      className={`sideBarOption ${
        active && "sideBarOption--active"
      } flex flex-row items-center cursor-pointer hover:bg-blue-50 rounded-full`}
    >
      <Icon className="m-4" />
      <p className="font-bold text-lg mr-4">{text}</p>
    </div>
  );
};

export default SideBarOption;
