import React, { useContext } from "react";
import { UserContext } from "../context/context";
import parse from "html-react-parser";
import { SET_EDIT_POST_DATA } from "../context/action.type";
import { useHistory } from "react-router";
import draftToHtml from "draftjs-to-html";

const ViewPost = () => {
  const { appState, dispatch } = useContext(UserContext);
  const history = useHistory();
  const { viewPostData } = appState;

  const handleEditClick = () => {
    dispatch({ type: SET_EDIT_POST_DATA, payload: viewPostData });
    history.push("editPost");
  };

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
      >
        <button
          className="editbtn"
          style={{
            color: "#272626",
            fontSize: "24px",
            width: "50%",
            justifySelf: "center",
          }}
          onClick={() => handleEditClick()}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
