import React, { useEffect, useReducer } from 'react'
import PostCategorySelector from '../Components/PostCategorySelector'

import { addPostReducer } from '../context/reducer'

// Editior
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import {
  UPDATE_EDITOR_STATE,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_SAMPLE,
  UPDATE_POST_TITLE,
  UPDATE_POST_ID,
  SET_IS_PRIVATE,
} from '../context/action.type'
import { useContext } from 'react'
import { UserContext } from '../context/context'
import { firestore } from 'firebase'
import ImagePicker from '../Components/ImagePicker'
import { uploadPost } from '../context/databasefunction'
import Loading from './Loading'

const initialState = {
  postId: null,
  editorState: EditorState.createEmpty(),
  postTitle: '',
  postSample: '',
  postCategory: 'Python',
  isPrivate: true,
}

const AddPost = () => {
  const [postState, dispatchPost] = useReducer(addPostReducer, initialState)
  const { appState } = useContext(UserContext)
  const { postId } = postState

  const { user } = appState

  const getPostId = async () => {
    const postdoc = await firestore()
      .collection('Users')
      .doc(appState.user.uid)
      .collection('post')
      .doc()

    dispatchPost({ type: UPDATE_POST_ID, payload: postdoc.id })
  }

  useEffect(() => {
    if (user.uid && !postId) getPostId()
  }, [user.uid])

  if (appState.isLoading) {
    return <Loading />
  }
  return (
    <div className="screenContainer">
      <h1 className="heading">Add Post</h1>
      <div className="addPostFormContainer">
        <label>Enter Post Title:</label>
        <input
          type="text"
          name="postTitle"
          value={postState.postTitle}
          onChange={(e) => {
            dispatchPost({
              type: UPDATE_POST_TITLE,
              payload: e.target.value,
            })
          }}
        />
        <label>Enter Category:</label>
        <PostCategorySelector
          name="postCategory"
          value={postState.postCategory}
          showAll={false}
          onChange={(e) => {
            dispatchPost({
              type: UPDATE_POST_CATEGORY,
              payload: e.target.value,
            })
          }}
        />
        <label>Post Private/Public:</label>
        <select
          name="isPrivate"
          value={`${postState.isPrivate ? 'Private' : 'Public'}`}
          onChange={(e) => {
            if (e.target.value === 'Private') {
              dispatchPost({
                type: SET_IS_PRIVATE,
                payload: true,
              })
            } else {
              dispatchPost({
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
          value={postState.postSample}
          onChange={(e) => {
            dispatchPost({
              type: UPDATE_POST_SAMPLE,
              payload: e.target.value,
            })
          }}
        />
        <ImagePicker postId={postId} />
        <Editor
          editorState={postState.editorState}
          wrapperClassName="editorWrapperClass"
          editorClassName="editorBodyClass"
          toolbarClassName="editorToolbarClass"
          onEditorStateChange={(e) => {
            dispatchPost({
              type: UPDATE_EDITOR_STATE,
              payload: e,
            })
          }}
        />
        {postId ? (
          <>
            {postId ? (
              <button
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
              </button>
            ) : (
              <button onClick={() => getPostId()}>GET post ID</button>
            )}
          </>
        ) : (
          <h5>Wait for connection to etlabise</h5>
        )}
      </div>
    </div>
  )
}

export default AddPost
