import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { toast } from "react-toastify";
import { UserContext } from "../context/context";

import Loading from "../Components/Loading";
// firebase
import firebase from "firebase/app";
const SignUp = () => {
  const { appState } = useContext(UserContext);

  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleSignUp = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        firebase
          .firestore()
          .collection("Users")
          .doc(data.user.uid)
          .set({
            name,
            email,
            bio,
            uid: data.user.uid,
          })
          .then(() => {
            toast("Sign Up successfully", {
              type: "success",
            });
          });
      })

      .catch((error) => {
        console.log("Error", error);
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
      <h1 className="mytext-primary text-center border-bottom pb-1">Sign Up</h1>
      {appState.isLoading ? <Loading /> : null}

      <div className="p-4 myborder-5 myborder-orange mt-4">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="bio" className="form-label">
          Bio:
        </label>
        <input
          className="form-control"
          type="text"
          name="bio"
          value={bio}
          placeholder="Enter Bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
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
        <button onClick={() => handleSignUp()} className="mybtn mybtn-success">
          Sign Up
        </button>

        <p className="text-center">
          Have an account?{" "}
          <Link to="/signIn" style={{ color: "#35BDD0" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
