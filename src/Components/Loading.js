import React from "react";
import loadingGif from "../static/loading.gif";
const Loading = () => {
  return (
    <div className="container text-light position-absolute top-50 start-50">
      <img src={loadingGif} style={{ width: "100px" }} alt="Loading" />
    </div>
  );
};

export default Loading;
