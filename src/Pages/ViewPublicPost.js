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
      console.log("USEEFFECT");
    }
  }, [postId]);

  return (
    <div className="screenContainer">
      <div className="viewContainer">
        {viewPostData ? (
          <>
            <div>
              <h2>{viewPostData.postTitle}</h2>
            </div>
            {parse(draftToHtml(viewPostData.editorStateRaw))}
          </>
        ) : (
          <h4>No Post Data</h4>
        )}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      ></div>
    </div>
  );
};

export default ViewPublicPost;
