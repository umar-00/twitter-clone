import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// import { useStateValue } from "./StateProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log("isLoggedIn from PR:", isLoggedIn);
  // const [{ isLoggedIn }, dispatch] = useStateValue();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn === 1) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    ></Route>
  );
};

export default PrivateRoute;
