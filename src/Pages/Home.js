import React, { useContext, useState, useEffect } from "react";
import PostCategorySelector from "../Components/PostCategorySelector";
import PostInfoCard from "../Components/PostInfoCard";
import { UserContext } from "../context/context";
import { searchUserPost } from "../context/databasefunction";
import Loading from "./Loading";

const Home = () => {
  const { appState, dispatch } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearch = () => {
    searchUserPost({
      title,
      category,
      dispatch,
      uid: appState.user.uid,
    });
  };

  useEffect(() => {
    if (appState.user.uid)
      searchUserPost({
        title,
        category,
        dispatch,
        uid: appState.user.uid,
      });
  }, [appState.user.uid]);

  if (appState.isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="p-4 myborder-orange mt-4">
        <form onSubmit={() => handleSearch()}>
          <div className="row ">
            <div className="col-md-6">
              <label for="title" className="form-label">
                Post Title:
              </label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="col-md-4">
              <label for="postCategory" className="form-label">
                Post Category:
              </label>
              <PostCategorySelector
                value={category}
                showAll={true}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex flex-column justify-content-end ">
              <button className="mybtn">Submit</button>
            </div>
          </div>
        </form>
      </div>

      {appState.searchPostData != {} ? (
        <>
          {Object.entries(appState.searchPostData).map(([key, value]) => (
            <PostInfoCard
              value={value}
              key={key}
              isBin={false}
              isSearchPost={true}
              isPrivate={true}
            />
          ))}
        </>
      ) : (
        <h3> No post Fetch</h3>
      )}
    </div>
  );
};

export default Home;
