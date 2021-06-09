import React, { useContext, useState, useEffect } from "react";
import PostCategorySelector from "../Components/PostCategorySelector";
import PostInfoCard from "../Components/PostInfoCard";
import { UserContext } from "../context/context";
import { searchUserPost } from "../context/databasefunction";
import Loading from "./Loading";

const Home = () => {
  const { appState, dispatch } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [numberOfPost, setNumberOfPost] = useState(0);
  const [category, setCategory] = useState("All");

  const handleSearch = () => {
    searchUserPost({
      title,
      numberOfPost,
      category,
      dispatch,
      uid: appState.user.uid,
    });
  };

  useEffect(() => {
    if (appState.user.uid)
      searchUserPost({
        title,
        numberOfPost: 20,
        category,
        dispatch,
        uid: appState.user.uid,
      });
  }, [appState.user.uid]);

  if (appState.isLoading) {
    return <Loading />;
  }

  return (
    <div className="screenContainer">
      <div className="searchFilterContainer">
        <div className="searchFilterInput">
          <label for="title">Post Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setNumberOfPost(0);
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="searchFilterInput">
          <label for="noOfPost">Number of Post To Fetch:</label>

          {title === "" ? (
            <input
              type="number"
              name="noOfPost"
              value={numberOfPost}
              onChange={(e) => setNumberOfPost(parseInt(e.target.value))}
            />
          ) : (
            <>
              <p>You cant slect with post title</p>
            </>
          )}
        </div>
        <div className="searchFilterInput">
          <label for="postCategory">Post Category:</label>
          <PostCategorySelector
            value={category}
            showAll={true}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button onClick={() => handleSearch()}>Submit</button>
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
