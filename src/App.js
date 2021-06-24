import React, { useContext, useEffect } from "react";
import "./css/app.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { UserContext } from "./context/context";

// Pages
import Home from "./Pages/Home";
import AddPost from "./Pages/AddPost";
import ViewPost from "./Pages/ViewPost";
import Explore from "./Pages/Explore";
import Bin from "./Pages/Bin";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import NotFound from "./Pages/NotFound";

// Components
import Header from "./Components/Header";

import {
  IS_AUTHTHENTICATED,
  IS_EMAIL_VERIFIED,
  IS_SIGNIN,
  SET_IS_LOADING,
  SET_USER,
} from "./context/action.type";

import VerifyEmail from "./Pages/VerifyEmail";
import ViewPublicPost from "./Pages/ViewPublicPost";

// firebase
import firebase from "firebase/app";

const App = () => {
  const { dispatch, appState } = useContext(UserContext);
  const { isAuthenticated } = appState;

  const onAuthStateChanged = async (user) => {
    if (user) {
      dispatch({ type: IS_SIGNIN, payload: true });

      if (!user.emailVerified) {
        user
          .sendEmailVerification()
          .then(function () {
            console.log("Email send");
          })
          .catch(function (error) {
            console.log("error", error);
          });
      } else {
        dispatch({ type: IS_EMAIL_VERIFIED, payload: true });
        dispatch({ type: IS_AUTHTHENTICATED, payload: true });
      }

      await firebase
        .firestore()
        .collection("Users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          dispatch({ type: SET_USER, payload: doc.data() });
          dispatch({ type: SET_IS_LOADING, payload: false });
        });
    } else {
      dispatch({ type: SET_IS_LOADING, payload: false });
    }
  };

  useEffect(() => {
    dispatch({ type: SET_IS_LOADING, payload: true });

    const susbcriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
  }, []);

  return (
    <div className="container text-light ">
      <Router>
        <ToastContainer />

        <Header />
        <Switch>
          <Route exact path="/">
            <Explore />
          </Route>
          <Route exact path="/publicPost/:postId">
            <ViewPublicPost />
          </Route>
          <Route exact path="/home">
            {isAuthenticated ? <Home /> : <Redirect to="/signIn" />}
          </Route>
          <Route exact path="/post/:isAddPost">
            {isAuthenticated ? <AddPost /> : <Redirect to="/signIn" />}
          </Route>
          <Route exact path="/viewPost">
            {isAuthenticated ? <ViewPost /> : <Redirect to="/signIn" />}
          </Route>

          <Route exact path="/bin">
            {isAuthenticated ? <Bin /> : <SignIn />}
          </Route>
          <Route exact path="/signIn">
            {isAuthenticated ? <Redirect to="/home" /> : <SignIn />}
          </Route>
          <Route exact path="/signUp">
            {isAuthenticated ? <Redirect to="/home" /> : <SignUp />}
          </Route>
          <Route exact path="/verifyEmail" component={VerifyEmail} />

          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
