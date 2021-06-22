import React, { useContext, useState, useEffect } from "react";
import PostCategorySelector from "../Components/PostCategorySelector";
import PostInfoCard from "../Components/PostInfoCard";
import { UserContext } from "../context/context";
import { searchUserPost } from "../context/databasefunction";
import Loading from "../Components/Loading";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { appState, dispatch } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("All");
  const history = useHistory();

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

  console.log("appState.isLoading", appState.isLoading);

  return (
    <div>
      {appState.isLoading ? <Loading /> : null}

      <div className="p-4 myborder-5 myborder-orange mt-4">
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
            <button className="mybtn" onClick={() => handleSearch()}>
              Submit
            </button>
          </div>
        </div>
      </div>

      {appState.searchPostData.length !== 0 ? (
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
        <div className="mt-4 mt-4 myborder-3 p-4">
          <h3 className="mytext-warning">You don't have any post.</h3>

          <h4>Got to Explore page </h4>
          <button className="mybtn" onClick={() => history.push("/")}>
            Explore
          </button>
          <h4>Got to Add new post page</h4>
          <button
            className="mybtn"
            onClick={() => history.push("/post/addpost")}
          >
            ADD Post
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
