import React, { useContext, useEffect } from "react";
import PostInfoCard from "../Components/PostInfoCard";
import { UserContext } from "../context/context";
import { getUserBinPost } from "../context/databasefunction";
import Loading from "../Components/Loading";
import { useHistory } from "react-router-dom";

const Bin = () => {
  const { appState, dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getUserBinPost({ uid: appState.user.uid, dispatch });
  }, []);

  return (
    <div className="myborder-5 p-4 mt-4  ">
      <h1 className="mytext-primary text-center border-bottom">Bin</h1>
      {appState.isLoading ? <Loading /> : null}
      {appState.BinPostData.length === 0 ? (
        <div className="mt-4 pt-4">
          <h2 className="mt-4 mb-4">There is no post in your bin</h2>
          <button className="mybtn" onClick={() => history.push("/home")}>
            Go to home page
          </button>
        </div>
      ) : (
        <div className="row">
          {Object.entries(appState.BinPostData).map(([key, value]) => (
            <PostInfoCard value={value} key={key} isBin={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bin;
