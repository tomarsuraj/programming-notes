import React, { useContext } from "react";
import { UserContext } from "../context/context";
import parse from "html-react-parser";
import { Container } from "react-bootstrap";

const ViewPost = () => {
  const { appState } = useContext(UserContext);
  const { viewPostData } = appState;

  console.log("viewPostData", viewPostData);

  //   if (!appState.isAuthenticated) {
  //     return <Red to="/signIn" />;
  //   }

  return (
    <Container>
      {viewPostData ? (
        <>
          <div>
            <h2>{viewPostData.postTitle}</h2>
          </div>
          {parse(viewPostData.postBody)}
        </>
      ) : (
        <h4>No Post Data</h4>
      )}
    </Container>
  );
};

export default ViewPost;
