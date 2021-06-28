import React, { useContext, useEffect, useState } from "react";
import PostCategorySelector from "../Components/PostCategorySelector";
import PostInfoCard from "../Components/PostInfoCard";
import { UserContext } from "../context/context";
import { searchPublicPost } from "../context/databasefunction";
import Loading from "../Components/Loading";
import { useHistory } from "react-router-dom";
import {
  SET_LAST_USER_QUEARY_DOC,
  SET_PUBLIC_POST,
} from "../context/action.type";

const Explore = () => {
  const { appState, dispatch } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("All");
  const history = useHistory();

  const handleSearch = () => {
    dispatch({ type: SET_PUBLIC_POST, payload: [] });
    dispatch({
      type: SET_LAST_USER_QUEARY_DOC,
      payload: [],
    });
    searchPublicPost({
      title,
      category,
      dispatch,
      lastDoc: [],
    });
  };

  const handleFetchNewPost = () => {
    searchPublicPost({
      title,
      category,
      dispatch,
      lastDoc: appState.lastUserQuearyDoc,
    });
  };

  useEffect(() => {
    dispatch({ type: SET_PUBLIC_POST, payload: [] });

    searchPublicPost({
      title,
      category,
      dispatch,
      lastDoc: [],
    });
  }, []);

  return (
    <div>
      {appState.isLoading ? <Loading /> : null}
      <h1 className="mytext-primary text-center border-bottom pb-1">Explore</h1>

      <div className="p-4 myborder-5 myborder-orange mt-4">
        <div className="row ">
          <div className="col-md-6">
            <label htmlFor="title" className="form-label">
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
            <label htmlFor="postCategory" className="form-label">
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
      {appState.publicPost.length !== 0 ? (
        <div className="row">
          {Object.entries(appState.publicPost).map(([key, value]) => (
            <PostInfoCard
              value={value}
              key={key}
              isBin={false}
              isPrivate={false}
            />
          ))}
          <button className="mybtn mt-4" onClick={() => handleFetchNewPost()}>
            More
          </button>
        </div>
      ) : (
        <div className="mt-4 mt-4 myborder-3 p-4">
          <h3 className="mytext-warning">
            We dont have any post to show you right now
          </h3>
          {appState.isAuthenticated ? (
            <div>
              <h4>Got to home page </h4>
              <button className="mybtn" onClick={() => history.push("/home")}>
                Home
              </button>
              <h4>Got to Add new post page</h4>
              <button
                className="mybtn"
                onClick={() => history.push("/post/addpost")}
              >
                ADD Post
              </button>
            </div>
          ) : (
            <div>
              <h4>You can sign to add post or your own</h4>

              <button className="mybtn" onClick={() => history.push("/signIn")}>
                Sign In
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
