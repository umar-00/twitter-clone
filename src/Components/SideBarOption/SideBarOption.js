import React from "react";
import "./SideBarOption.css";

const SideBarOption = ({ active, reactIconsStyle, Icon, text, onClick }) => {
  return (
    <div
      className={`sideBarOption ${
        active && "sideBarOption--active"
      } flex flex-row items-center cursor-pointer hover:bg-blue-50 rounded-full`}
      onClick={onClick}
      style={{ userSelect: "none" }}
    >
      <Icon className={`m-4 ${reactIconsStyle}`} />
      <p className="font-bold text-lg mr-4 hidden xl:block">{text}</p>
    </div>
  );
};

export default SideBarOption;
