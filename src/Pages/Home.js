import React, { useContext, useState, useEffect } from "react";
import PostCategorySelector from "../Components/PostCategorySelector";
import PostInfoCard from "../Components/PostInfoCard";
import { UserContext } from "../context/context";
import { searchUserPost } from "../context/databasefunction";
import Loading from "../Components/Loading";
import { useHistory } from "react-router-dom";
import {
  SET_LAST_USER_QUEARY_DOC,
  SET_USER_POST,
} from "../context/action.type";

const Home = () => {
  const { appState, dispatch } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("All");

  const history = useHistory();

  const handleSearch = () => {
    dispatch({ type: SET_USER_POST, payload: [] });
    dispatch({
      type: SET_LAST_USER_QUEARY_DOC,
      payload: [],
    });
    searchUserPost({
      title,
      category,
      dispatch,
      uid: appState.user.uid,
      lastDoc: [],
    });
  };
  const handleFetchNewPost = () => {
    searchUserPost({
      title,
      category,
      dispatch,
      uid: appState.user.uid,
      lastDoc: appState.lastUserQuearyDoc,
    });
  };

  useEffect(() => {
    if (appState.user.uid) {
      dispatch({ type: SET_USER_POST, payload: [] });

      searchUserPost({
        title,
        category,
        dispatch,
        uid: appState.user.uid,
        lastDoc: [],
      });
    }
  }, [appState.user.uid]);

  return (
    <div>
      {appState.isLoading ? <Loading /> : null}

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

      {appState.post.length !== 0 ? (
        <>
          {Object.entries(appState.post).map(([key, value]) => (
            <PostInfoCard
              value={value}
              key={key}
              isBin={false}
              isSearchPost={true}
              isPrivate={true}
            />
          ))}
          <button className="mybtn mt-4" onClick={() => handleFetchNewPost()}>
            More
          </button>
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
