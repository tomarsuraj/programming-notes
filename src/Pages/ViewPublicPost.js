import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/context";
import parse from "html-react-parser";

import draftToHtml from "draftjs-to-html";
import { useParams } from "react-router-dom";
import { getPublicPost } from "../context/databasefunction";

const ViewPublicPost = () => {
  const { appState, dispatch } = useContext(UserContext);
  const { viewPostData } = appState;
  const { postId } = useParams();

  useEffect(() => {
    if (viewPostData.id !== postId) {
      getPublicPost({ postId, dispatch });
    }
  }, [postId]);

  return (
    <div className="myborder-3 myborder-light-grey  p-4 mt-4">
      {viewPostData ? (
        <>
          <div className="border-bottom">
            <h2>{viewPostData.postTitle}</h2>
          </div>
          {parse(draftToHtml(viewPostData.editorStateRaw))}
        </>
      ) : (
        <h4 className="mytext-warning">No Post exit with ID</h4>
      )}
    </div>
  );
};

export default ViewPublicPost;
