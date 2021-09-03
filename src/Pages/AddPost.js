import React, { useEffect, useReducer, useState } from 'react';
import PostCategorySelector from '../Components/PostCategorySelector';

import { addPostReducer } from '../context/reducer';

// Editior
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  UPDATE_EDITOR_STATE,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_SAMPLE,
  UPDATE_POST_TITLE,
  UPDATE_POST_ID,
  SET_IS_PRIVATE,
  SET_EDIT_POST_STATE,
  CLEAR_POST_STATE,
} from '../context/action.type';

import { useContext } from 'react';
import { UserContext } from '../context/context';

import {
  deletePublicPost,
  updatePost,
  uploadPost,
} from '../context/databasefunction';
import Loading from '../Components/Loading';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { toolbarOptions } from '../Components/editorconfig';

// firebase
import firebase from 'firebase/app';

const initialState = {
  postId: null,
  editorState: '',
  postTitle: '',
  postSample: '',
  postCategory: 'Python',
  isPrivate: true,
};

const AddPost = () => {
  const [postState, dispatchPost] = useReducer(addPostReducer, initialState);
  const { appState } = useContext(UserContext);
  const { postId } = postState;
  const history = useHistory();
  const { isAddPost } = useParams();
  const [showPostIsPrivateChangeModal, setShowPostIsPrivateChangeModal] =
    useState(false);

  const { editPostData } = appState;

  const uploadPostFun = () => {
    if (isAddPost === 'addpost') {
      uploadPost({
        postState,
        appState,
        dispatch: dispatchPost,
        initialState,
        history,
      });
    } else if (isAddPost === 'editpost') {
      updatePost({
        postState,
        appState,
        dispatch: dispatchPost,
        initialState,
        history,
      });
    }
  };

  const handleSubmit = async () => {
    if (isAddPost === 'addpost') {
      uploadPostFun();
    } else if (isAddPost === 'editpost') {
      if (editPostData.isPrivate === postState.isPrivate) {
        uploadPostFun();
      } else {
        setShowPostIsPrivateChangeModal(true);
      }
    }
  };

  useEffect(() => {
    if (isAddPost === 'editpost' || isAddPost === 'addpost') {
      if (isAddPost === 'editpost') {
        dispatchPost({ type: SET_EDIT_POST_STATE, payload: editPostData });
      } else {
        dispatchPost({ type: CLEAR_POST_STATE, payload: initialState });
      }
    } else {
      history.replace('/');
    }
  }, [isAddPost]);

  return (
    <div className="myborder-5 p-3 mb-2 mt-3">
      <h1 className="heading text-center border-bottom">
        {isAddPost === 'editpost' ? 'Edit Post' : 'Add Post'}
      </h1>
      {appState.isLoading ? <Loading /> : null}

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
      <label className="form-label mt-2">Post Privacy:</label>
      <select
        name="isPrivate"
        value={`${postState.isPrivate ? 'Private' : 'Public'}`}
        className="form-select"
        onChange={(e) => {
          if (e.target.value === 'Private') {
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
        maxLength="250"
        value={postState.postSample}
        onChange={(e) => {
          dispatchPost({
            type: UPDATE_POST_SAMPLE,
            payload: e.target.value,
          });
        }}
      />

      <div className="mt-4">
        <ReactQuill
          value={postState.editorState ? postState.editorState : ''}
          onChange={(e) => {
            dispatchPost({
              type: UPDATE_EDITOR_STATE,
              payload: e,
            });
          }}
          modules={{
            toolbar: toolbarOptions,
          }}
        />
      </div>

      <button onClick={() => handleSubmit()} className="mybtn mybtn-success">
        {isAddPost === 'addpost' ? ' ADD Post' : 'Edit Post'}
      </button>

      <div
        className={
          showPostIsPrivateChangeModal
            ? 'mymodal displaBlock'
            : 'mymodal displayNone'
        }
      >
        <div className="mymodalMain myborder-3 myborder-primary">
          {postState.isPrivate ? (
            <>
              <div className="row border-bottom mb-4">
                <h3 className="mytext-primary">
                  You Change Public Post to Private Post.
                </h3>
                <p>This mean no one can see this post, form now ownward.</p>
              </div>
              <div className="row">
                <h4 className="mytext-primary">
                  You can take following action.
                </h4>
                <div className="col-md-9">
                  <button
                    className="mybtn mybtn-success"
                    onClick={() => uploadPostFun()}
                  >
                    Make Change to Private Version,and keep public version as it
                    is.
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    className="mybtn"
                    onClick={() => setShowPostIsPrivateChangeModal(false)}
                  >
                    Let me Change
                  </button>
                </div>
                <div className="col-md-9">
                  <button
                    className="mybtn mybtn-success"
                    onClick={() => {
                      uploadPostFun();
                      deletePublicPost({ postId });
                    }}
                  >
                    Make Change to Private Version and Delete Public Version
                  </button>
                </div>

                <div className="col-md-3">
                  <button
                    className="mybtn mybtn-warning"
                    onClick={() => setShowPostIsPrivateChangeModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row border-bottom mb-4">
                <h3 className="mytext-primary">
                  You Change Private Post to Public Post.
                </h3>
                <p>This mean any one can see this post.</p>
              </div>
              <div className="row">
                <h4 className="mytext-primary">
                  You can take following action.
                </h4>
                <div className="col-md-5">
                  <button
                    className="mybtn"
                    onClick={() => {
                      setShowPostIsPrivateChangeModal(false);
                      dispatchPost({
                        type: SET_IS_PRIVATE,
                        payload: true,
                      });
                    }}
                  >
                    Let me change
                  </button>
                </div>
                <div className="col-md-4">
                  <button
                    className="mybtn mybtn-success"
                    onClick={() => uploadPostFun()}
                  >
                    Continue
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    className="mybtn mybtn-warning"
                    onClick={() => setShowPostIsPrivateChangeModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
