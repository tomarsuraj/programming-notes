import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Bootstrap Css
import "bootstrap/dist/css/bootstrap.min.css";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { UserContext } from "./context/context";
// Pages
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

// Components
import Header from "./Components/header";
import { IS_AUTHTHENTICATED, SET_USER } from "./context/action.type";
import { auth, firestore } from "firebase";
import AddPost from "./Pages/AddPost";
import ViewPost from "./Pages/ViewPost";
import { getUserPost } from "./context/databasefunction";
import EditPost from "./Pages/EditPost";
import SearchPost from "./Pages/SearchPost";
import PublicPost from "./Pages/PublicPost";
import BinPost from "./Pages/BinPost";

const App = () => {
  const { dispatch, appState } = useContext(UserContext);
  const { user } = appState;

  const onAuthStateChanged = async (user) => {
    if (user) {
      dispatch({ type: IS_AUTHTHENTICATED, payload: true });

      firestore()
        .collection("Users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          dispatch({ type: SET_USER, payload: doc.data() });
        });
    } else {
      dispatch({ type: IS_AUTHTHENTICATED, payload: false });
    }
  };

  useEffect(() => {
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
  }, []);

  useEffect(() => {
    if (user.uid) getUserPost({ uid: user.uid, dispatch });
  }, [user.uid]);

  return (
    <Router>
      <ToastContainer />

      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addPost" component={AddPost} />
        <Route exact path="/viewPost" component={ViewPost} />
        <Route exact path="/editPost" component={EditPost} />
        <Route exact path="/searchPost" component={SearchPost} />
        <Route exact path="/publicPost" component={PublicPost} />
        <Route exact path="/binPost" component={BinPost} />

        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />

        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
