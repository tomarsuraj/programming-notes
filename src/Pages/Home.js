import React, { useContext } from "react";

import { UserContext } from "../context/context";

// To Redirect Page
import { Redirect } from "react-router-dom";

const Home = () => {
  const { appData } = useContext(UserContext);

  //   if (!appData.isAuthenticated) {
  //     return <Redirect to="/signin" />;
  //   }

  return <div>HIU</div>;
};

export default Home;
