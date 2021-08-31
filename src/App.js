import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import "./App.css";
import "tailwindcss/tailwind.css";
import Login from "./Components/Login/Login";

import DashBoard from "./Components/DashBoard/DashBoard";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={DashBoard} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
