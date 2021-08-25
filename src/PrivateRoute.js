import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from "./StateProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ isLoggedIn }, dispatch] = useStateValue();

  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
