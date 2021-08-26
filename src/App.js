import React from "react";
// import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";

import "./App.css";
import "tailwindcss/tailwind.css";
import Login from "./Components/Login/Login";
// import SideBar from "./Components/SideBar/SideBar";
// import Feed from "./Components/Feed/Feed";
// import Widgets from "./Components/Widgets/Widgets";
import DashBoard from "./Components/DashBoard/DashBoard";

function App() {
  // const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  // console.log("isLoggedIn from PR:", isLoggedIn);

  // const [{ user }, dispatch] = useStateValue();
  // console.log("user", user);
  // console.log("token", token);
  // console.log("userId", userId);

  return (
    // <div
    //   className={`app flex flex-col mobile:flex-row justify-center max-w-screen-2xl mx-auto h-screen w-screen ${
    //     !user && `items-center`
    //   }`}
    // >
    //   {!user ? (
    //     <>
    //       <Login />
    //     </>
    //   ) : (
    //     <>
    //       <SideBar onLogOutClick={() => console.log("clicked logout")} />

    //       <Feed />

    //       <Widgets />
    //     </>
    //   )}
    // </div>

    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={DashBoard} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
