import React, { useReducer } from "react";

import App from "./App";

//Context
import { UserContext } from "./context/context";
import { appReducer } from "./context/reducer";

// firebase
import { firebaseConfig } from "./config";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

// Access data offline
firebase
  .firestore()
  .enablePersistence()
  .catch((err) => {
    if (err.code === "failed-precondition") {
      console.log(
        " Multiple tabs open, persistence can only be enabled in one tab at a a time"
      );
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === "unimplemented") {
      console.log(
        "// The current browser does not support all of the features required to enable persistence"
      );
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

const initialState = {
  isAuthenticated: false,
  isEmailVerified: false,
  isSignIn: false,
  user: {},
  post: [],
  BinPostData: {},
  viewPostData: {},
  editPostData: {},
  searchPostData: {},
  searchPublicData: {},
  isLoading: false,
  lastUserQuearyDoc: {},
};

const RootApp = () => {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  return (
    <UserContext.Provider value={{ appState: appState, dispatch }}>
      <App />
    </UserContext.Provider>
  );
};

export default RootApp;
