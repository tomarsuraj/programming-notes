import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import Header from "./Components/Header";
import { IS_AUTHTHENTICATED, SET_USER } from "./context/action.type";
import { auth } from "firebase";

const App = () => {
  const { dispatch, appData } = useContext(UserContext);

  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({ type: IS_AUTHTHENTICATED, payload: true });
    } else {
      dispatch({ type: IS_AUTHTHENTICATED, payload: false });
    }
  };

  useEffect(() => {
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
  }, []);

  console.log("App Data", appData.isAuthenticated);
  return (
    <Router>
      <ToastContainer />

      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />

        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
