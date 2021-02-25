import React, { useContext } from "react";

import { UserContext } from "../context/context";

// To Redirect Page
import { Redirect } from "react-router-dom";

const Home = () => {
  const { appState } = useContext(UserContext);

  if (!appState.isAuthenticated) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <h1>Home</h1>
      <h4>{appState.isAuthenticated ? "Truw" : "False"}</h4>
    </div>
  );
};

export default Home;
