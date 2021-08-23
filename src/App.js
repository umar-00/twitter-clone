import React, { useState } from "react";

import "./App.css";
import "tailwindcss/tailwind.css";
import Login from "./Components/Login/Login";
import SideBar from "./Components/SideBar/SideBar";
import Feed from "./Components/Feed/Feed";
import Widgets from "./Components/Widgets/Widgets";

function App() {
  const [user, setUser] = useState(null);
  // console.log("user", user);

  return (
    <div
      className={`app flex flex-col mobile:flex-row justify-center max-w-screen-2xl mx-auto h-screen w-screen ${
        !user && `items-center`
      }`}
    >
      {!user ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <SideBar />

          <Feed />

          <Widgets />
        </>
      )}
    </div>
  );
}

export default App;
