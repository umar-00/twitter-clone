import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";

const Login = () => {
  // Triggered on button submit
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => console.log(result))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login flex items-center bg-gray-100 w-full h-full">
      <div className="login__container flex flex-col bg-white items-center m-auto w-2/6 rounded-xl border-2 shadow-lg p-8">
        <img
          src="http://static.dezeen.com/uploads/2012/06/dezeen_twitter-bird.gif"
          alt=""
          className="w-36"
        />
        <div className="login__text ">
          <p className="text-center text-2xl font-bold">
            Sign in to Twitter (clone)
          </p>
        </div>

        <Button
          variant="outlined"
          className="sidebar__tweet__button"
          fullWidth
          onClick={signIn}
        >
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
