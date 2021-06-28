import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/context";
import Loading from "../Components/Loading";

// firebase
import firebase from "firebase/app";

const SignIn = () => {
  const { appState } = useContext(UserContext);

  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        toast("Sign In", {
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: "error",
        });
      });
  };

  if (!appState.isEmailVerified && appState.isSignIn) {
    return <Redirect to="/verifyEmail" />;
  }

  return (
    <div>
      <h1 className="mytext-primary text-center border-bottom pb-1">Sign in</h1>
      {appState.isLoading ? <Loading /> : null}

      <div className="p-4 myborder-5 myborder-orange mt-4">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          className="form-control"
          type="email"
          name="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          className="form-control"
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleSignIn()} className="mybtn mybtn-success">
          Sign In
        </button>
        <p className="text-center">
          Don’t have an account?{" "}
          <Link to="/signUp" style={{ color: "#35BDD0" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
