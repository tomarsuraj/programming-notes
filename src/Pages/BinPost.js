import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/context";
import { Button, Container, Row } from "react-bootstrap";
import { getUserBinPost } from "../context/databasefunction";
import PostInfoCard from "../Components/PostInfoCard";
import BinPostInfoCard from "../Components/BinPostInfoCard";

const BinPost = () => {
  const { appState, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUserBinPost({ uid: appState.user.uid, dispatch });
  }, []);

  return (
    <Container className="mt-4">
      {appState.BinPostData ? (
        <>
          {Object.entries(appState.BinPostData).map(([key, value]) => (
            <BinPostInfoCard value={value} key={key} />
          ))}
        </>
      ) : (
        <h3> No post Fetch</h3>
      )}
    </Container>
  );
};

export default BinPost;
