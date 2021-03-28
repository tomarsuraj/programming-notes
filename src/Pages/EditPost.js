import React, { useContext, useReducer, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/context'
import { deletePublicPost, uploadPost } from '../context/databasefunction'
import { editPostReducer } from '../context/reducer'

// Editior
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import PostCategorySelector from '../Components/PostCategorySelector'

import ImagePicker from '../Components/ImagePicker'
import {
  UPDATE_EDITOR_STATE,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_SAMPLE,
  UPDATE_POST_TITLE,
  SET_IS_PRIVATE,
  SET_EDIT_POST_DATA,
} from '../context/action.type'
import Loading from './Loading'

const initialState = {
  postId: null,
  editorState: EditorState.createEmpty(),
  postTitle: '',
  postSample: '',
  postCategory: 'Python',
  isPrivate: true,
  postImagesArray: [],
}

const EditPost = () => {
  const history = useHistory()

  const [editPostState, dispatchEditPost] = useReducer(
    editPostReducer,
    initialState,
  )

  const { appState } = useContext(UserContext)
  const { postId } = editPostState

  const [
    showPostIsPrivateChangeModal,
    setShowPostIsPrivateChangeModal,
  ] = useState(false)

  const { editPostData } = appState
  const postPrevIsPrivate = editPostData.isPrivate

  const uploadPostFun = () => {
    uploadPost({
      postState: editPostState,
      appState,
      postId,
      dispatch: dispatchEditPost,
      initialState,
      history,
    })
  }

  const handleSubmit = () => {
    if (postPrevIsPrivate === editPostState.isPrivate) {
      uploadPostFun()
    } else setShowPostIsPrivateChangeModal(true)
  }
  console.log('editPostData', editPostData)

  useEffect(() => {
    if (editPostData) {
      if (editPostData.postBody) {
        dispatchEditPost({ type: SET_EDIT_POST_DATA, payload: editPostData })
      } else {
        history.push('/')
      }
    }
  }, [editPostData])

  if (appState.isLoading) {
    return <Loading />
  }
  return (
    <div className="screenContainer">
      <h1 className="heading">Add Post</h1>
      <div className="addPostContainer">
        <div className="addPostFormContainer">
          <div className="addPostBasicFormContainer">
            <label>Enter Post Title:</label>
            <input
              type="text"
              name="postTitle"
              value={editPostState.postTitle}
              onChange={(e) => {
                dispatchEditPost({
                  type: UPDATE_POST_TITLE,
                  payload: e.target.value,
                })
              }}
            />
            <label>Enter Category:</label>
            <PostCategorySelector
              name="postCategory"
              showAll={false}
              value={editPostState.postCategory}
              onChange={(e) => {
                dispatchEditPost({
                  type: UPDATE_POST_CATEGORY,
                  payload: e.target.value,
                })
              }}
            />
            <label>Post Private/Public:</label>
            <select
              name="isPrivate"
              value={`${editPostState.isPrivate ? 'Private' : 'Public'}`}
              onChange={(e) => {
                if (e.target.value === 'Private') {
                  dispatchEditPost({
                    type: SET_IS_PRIVATE,
                    payload: true,
                  })
                } else {
                  dispatchEditPost({
                    type: SET_IS_PRIVATE,
                    payload: false,
                  })
                }
              }}
            >
              <option>Private</option>
              <option>Public</option>
            </select>

            <label>Post Sample:</label>
            <input
              type="text"
              name="postSample"
              value={editPostState.postSample}
              placeholder="Post Smaple"
              onChange={(e) => {
                dispatchEditPost({
                  type: UPDATE_POST_SAMPLE,
                  payload: e.target.value,
                })
              }}
            />
          </div>

          <ImagePicker
            postId={postId}
            postImagesArray={editPostState.postImagesArray}
            dispatchPost={dispatchEditPost}
          />
        </div>
        <Editor
          editorState={editPostState.editorState}
          wrapperClassName="editorWrapperClass"
          editorClassName="editorBodyClass"
          toolbarClassName="editorToolbarClass"
          onEditorStateChange={(e) => {
            dispatchEditPost({
              type: UPDATE_EDITOR_STATE,
              payload: e,
            })
          }}
          toolbar={{
            image: {
              defaultSize: {
                height: 'auto',
                width: '80%',
              },
            },
          }}
        />
        {postId ? (
          <>
            {postId ? (
              <button onClick={() => handleSubmit()}>ADD Post</button>
            ) : (
              <button>We dont Get Post id try again</button>
            )}
          </>
        ) : (
          <h5>Wait for connection to etlabise</h5>
        )}
      </div>

      <div
        className={
          showPostIsPrivateChangeModal
            ? 'modal displaBlock'
            : 'modal displayNone'
        }
      >
        <div className="modalMain">
          {editPostState.isPrivate == true ? (
            <>
              <h2>You change Public Post To Private</h2>
              <p>What Your want to Do Public version Of this Post </p>

              <button
                className="restorebtn"
                onClick={() => {
                  uploadPostFun()
                  setShowPostIsPrivateChangeModal(false)
                }}
              >
                Keep Public Post
              </button>
              <button
                className="deletebtn"
                onClick={() => {
                  uploadPostFun()
                  deletePublicPost({ postId })
                  setShowPostIsPrivateChangeModal(false)
                }}
              >
                Delete Public Post
              </button>
              <button
                className="deletebtn"
                onClick={() => {
                  setShowPostIsPrivateChangeModal(false)
                }}
              >
                Close
              </button>
            </>
          ) : (
            <>
              <h2>You change Private Post To Public</h2>
              <p>
                You make Private Post to Public Post That mean any one can see
                this post.
              </p>

              <button
                className="viewbtn"
                onClick={() => {
                  uploadPostFun()
                  setShowPostIsPrivateChangeModal(false)
                }}
              >
                Continue with Public Post
              </button>
              <button
                className="viewbtn"
                variant="secondary"
                onClick={() => {
                  setShowPostIsPrivateChangeModal(false)
                }}
              >
                Change to Private
              </button>

              <button
                className="deletebtn"
                onClick={() => {
                  setShowPostIsPrivateChangeModal(false)
                }}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditPost
