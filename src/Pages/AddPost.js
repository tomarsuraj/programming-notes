import React, { useReducer, useContext, useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { addPostReducer } from "../context/reducer";

// Editior
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ImagePicker from "../Components/imagePicker";
import {
  UPDATE_EDITOR_STATE,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_SAMPLE,
  UPDATE_POST_TITLE,
  UPDATE_POST_ID,
} from "../context/action.type";
import { uploadPost } from "../context/databasefunction";
import { UserContext } from "../context/context";
import { firestore } from "firebase";

const initialState = {
  postId: null,
  editorState: EditorState.createEmpty(),
  postTitle: "",
  postSample: "",
  postCategory: "Python",
  isPrivate: true,
};

const AddPost = () => {
  const [postState, dispatchPost] = useReducer(addPostReducer, initialState);
  const { appState } = useContext(UserContext);
  const { postId } = postState;

  const { user } = appState;

  const getPostId = async () => {
    console.log("get Post ID Calsle");

    const postdoc = await firestore()
      .collection("Users")
      .doc(appState.user.uid)
      .collection("post")
      .doc();

    dispatchPost({ type: UPDATE_POST_ID, payload: postdoc.id });
  };

  useEffect(() => {
    if (user.uid && !postId) getPostId();
  }, [user.uid]);

  return (
    <Container className="mb-5">
      <h3>Add Posts</h3>

      <Row>
        <Col sm={12} md={8}>
          <Form>
            <Form.Group controlId="postTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Post Title"
                value={postState.postTitle}
                onChange={(e) => {
                  dispatchPost({
                    type: UPDATE_POST_TITLE,
                    payload: e.target.value,
                  });
                }}
              />
              <Form.Text className="text-muted">
                Title should be unique
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="postCategory">
              <Form.Label>Select Category</Form.Label>
              <Form.Control
                as="select"
                value={postState.postCategory}
                onChange={(e) => {
                  dispatchPost({
                    type: UPDATE_POST_CATEGORY,
                    payload: e.target.value,
                  });
                }}
              >
                <option>Python</option>
                <option>Javascript</option>
                <option>Java</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="postSample">
              <Form.Label>Post Smaple</Form.Label>
              <Form.Control
                type="text"
                value={postState.postSample}
                placeholder="Post Smaple"
                onChange={(e) => {
                  dispatchPost({
                    type: UPDATE_POST_SAMPLE,
                    payload: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Col>
        {postId ? (
          <ImagePicker postId={postId} />
        ) : (
          <h5>Get Post ID first to Upload Image to our Server</h5>
        )}
      </Row>

      <Row className="my-2 bg-light border border-primary">
        <Col sm={12}>
          <Editor
            editorState={postState.editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={(e) => {
              dispatchPost({
                type: UPDATE_EDITOR_STATE,
                payload: e,
              });
            }}
          />
        </Col>
      </Row>
      <Row>
        {user.uid ? (
          <>
            {postId ? (
              <Button
                onClick={() =>
                  uploadPost({
                    postState,
                    appState,
                    postId,
                    dispatch: dispatchPost,
                    initialState,
                  })
                }
              >
                ADD Post
              </Button>
            ) : (
              <Button onClick={() => getPostId()}>GET post ID</Button>
            )}
          </>
        ) : (
          <h5>Wait for connection to etlabise</h5>
        )}
      </Row>
    </Container>
  );
};

export default AddPost;
