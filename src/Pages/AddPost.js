import React, { useEffect, useReducer } from "react";
import PostCategorySelector from "../Components/PostCategorySelector";

import { addPostReducer } from "../context/reducer";

// Editior
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  UPDATE_EDITOR_STATE,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_SAMPLE,
  UPDATE_POST_TITLE,
  UPDATE_POST_ID,
  SET_IS_PRIVATE,
  SET_EDIT_POST_STATE,
} from "../context/action.type";

import { useContext } from "react";
import { UserContext } from "../context/context";
import { firestore } from "firebase";
import { uploadPost } from "../context/databasefunction";
import Loading from "./Loading";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";

const initialState = {
  postId: null,
  editorState: EditorState.createEmpty(),
  postTitle: "",
  postSample: "",
  postCategory: "Python",
  isPrivate: true,
  postImagesArray: [],
};

const AddPost = () => {
  const [postState, dispatchPost] = useReducer(addPostReducer, initialState);
  const { appState } = useContext(UserContext);
  const { postId } = postState;
  const history = useHistory();
  const { isAddPost } = useParams();

  const { user, editPostData } = appState;

  const getPostId = async () => {
    const postdoc = await firestore()
      .collection("Users")
      .doc(appState.user.uid)
      .collection("post")
      .doc();

    dispatchPost({ type: UPDATE_POST_ID, payload: postdoc.id });
    console.log("getPOst ID Call");
  };
  const handleSubmit = async () => {
    if (isAddPost === "addpost") {
      uploadPost({
        postState,
        appState,
        dispatch: dispatchPost,
        initialState,
        history,
      });
    } else if (isAddPost === "editpost") {
      if (editPostData.isPrivate === postState.isPrivate) {
        uploadPost({
          postState,
          appState,
          dispatch: dispatchPost,
          initialState,
          history,
        });
      } else {
        console.log("Privace status change ");
      }
    }
  };

  useEffect(() => {
    if (isAddPost === "editpost" || isAddPost === "addpost") {
      if (isAddPost === "editpost") {
        dispatchPost({ type: SET_EDIT_POST_STATE, payload: editPostData });
        console.log("editPostData", editPostData);
      }
    } else {
      history.replace("/");
    }
  }, []);

  if (appState.isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="heading">Add Post</h1>
      <label className="form-label mt-2">Enter Post Title:</label>
      <input
        className="form-control"
        type="text"
        name="postTitle"
        value={postState.postTitle}
        onChange={(e) => {
          dispatchPost({
            type: UPDATE_POST_TITLE,
            payload: e.target.value,
          });
        }}
      />
      <label className="form-label mt-2">Enter Category:</label>
      <PostCategorySelector
        name="postCategory"
        value={postState.postCategory}
        showAll={false}
        onChange={(e) => {
          dispatchPost({
            type: UPDATE_POST_CATEGORY,
            payload: e.target.value,
          });
        }}
      />
      <label className="form-label mt-2">Post Private/Public:</label>
      <select
        name="isPrivate"
        value={`${postState.isPrivate ? "Private" : "Public"}`}
        className="form-select"
        onChange={(e) => {
          if (e.target.value === "Private") {
            dispatchPost({
              type: SET_IS_PRIVATE,
              payload: true,
            });
          } else {
            dispatchPost({
              type: SET_IS_PRIVATE,
              payload: false,
            });
          }
        }}
      >
        <option>Private</option>
        <option>Public</option>
      </select>
      <label className="form-label mt-2">Post Sample:</label>
      <textarea
        className="form-control"
        rows="3"
        type="text"
        name="postSample"
        value={postState.postSample}
        onChange={(e) => {
          dispatchPost({
            type: UPDATE_POST_SAMPLE,
            payload: e.target.value,
          });
        }}
      />

      <div className="mt-4">
        <Editor
          editorState={postState.editorState}
          wrapperClassName="editorWrapperClass"
          editorClassName="editorBodyClass"
          toolbarClassName="editorToolbarClass"
          onEditorStateChange={(e) => {
            dispatchPost({
              type: UPDATE_EDITOR_STATE,
              payload: e,
            });
          }}
          toolbar={{
            image: {
              defaultSize: {
                height: "auto",
                width: "80%",
              },
            },
          }}
        />
      </div>
      {postId ? (
        <button onClick={() => handleSubmit()} className="mybtn">
          {isAddPost === "addpost" ? " ADD Post" : "Edit Post"}
        </button>
      ) : (
        <button onClick={() => getPostId()} className="mybtn">
          GET post ID
        </button>
      )}
    </div>
  );
};

export default AddPost;
