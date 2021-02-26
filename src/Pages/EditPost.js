import React, { useReducer, useContext, useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { editPostReducer } from "../context/reducer";

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
  SET_IS_PRIVATE,
  SET_EDIT_POST_DATA,
} from "../context/action.type";
import { uploadPost } from "../context/databasefunction";
import { UserContext } from "../context/context";
import { useHistory } from "react-router-dom";

const initialState = {
  postId: null,
  editorState: EditorState.createEmpty(),
  postTitle: "",
  postSample: "",
  postCategory: "Python",
  isPrivate: true,
};

const EditPost = () => {
  const history = useHistory();

  const [editPostState, dispatchEditPost] = useReducer(
    editPostReducer,
    initialState
  );

  const { appState } = useContext(UserContext);
  const { postId } = editPostState;

  const { editPostData } = appState;

  useEffect(() => {
    if (editPostData) {
      if (editPostData.postBody) {
        dispatchEditPost({ type: SET_EDIT_POST_DATA, payload: editPostData });
      } else {
        history.push("/");
      }
    }
  }, [editPostData]);

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
                value={editPostState.postTitle}
                onChange={(e) => {
                  dispatchEditPost({
                    type: UPDATE_POST_TITLE,
                    payload: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="postCategory">
              <Form.Label>Select Category</Form.Label>
              <Form.Control
                as="select"
                value={editPostState.postCategory}
                onChange={(e) => {
                  dispatchEditPost({
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
            <Form.Group controlId="postCategory">
              <Form.Label>Select Private/Public</Form.Label>
              <Form.Control
                as="select"
                value={`${editPostState.isPrivate ? "Private" : "Public"}`}
                onChange={(e) => {
                  if (e.target.value === "Private") {
                    dispatchEditPost({
                      type: SET_IS_PRIVATE,
                      payload: true,
                    });
                  } else {
                    dispatchEditPost({
                      type: SET_IS_PRIVATE,
                      payload: false,
                    });
                  }
                }}
              >
                <option>Private</option>
                <option>Public</option>
              </Form.Control>

              <Form.Text className="text-muted">
                If you change Public post to private then old version og this
                post remain in public folder of app. i.e Your feature edit won't
                change in public version ot this.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="postSample">
              <Form.Label>Post Smaple</Form.Label>
              <Form.Control
                type="text"
                value={editPostState.postSample}
                placeholder="Post Smaple"
                onChange={(e) => {
                  dispatchEditPost({
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
            editorState={editPostState.editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={(e) => {
              dispatchEditPost({
                type: UPDATE_EDITOR_STATE,
                payload: e,
              });
            }}
          />
        </Col>
      </Row>
      <Row>
        <Button
          onClick={() =>
            uploadPost({
              postState: editPostState,
              appState,
              postId,
              dispatch: dispatchEditPost,
              initialState,
            })
          }
        >
          Update Post
        </Button>
      </Row>
    </Container>
  );
};

export default EditPost;
