import React, { useContext } from 'react'
import { UserContext } from '../context/context'
import { useHistory } from 'react-router-dom'
import {
  DELETE_POST_FROM_SEARCH_POST_DATA,
  SET_EDIT_POST_DATA,
  SET_VIEW_POST_DATA,
} from '../context/action.type'
import {
  deleteBinPost,
  getUserBinPost,
  moveTobin,
  restoreBinPost,
} from '../context/databasefunction'

const PostInfoCard = ({ isBin, value, isSearchPost }) => {
  const { appState, dispatch } = useContext(UserContext)
  const history = useHistory()

  const handleViewClick = () => {
    dispatch({ type: SET_VIEW_POST_DATA, payload: value })
    history.push('viewPost')
  }

  const handleEditClick = () => {
    dispatch({ type: SET_EDIT_POST_DATA, payload: value })
    history.push('editPost')
  }
  return (
    <div className="postInfoCardContainer">
      <h2>{value.postTitle}</h2>
      <p>{value.postSample}</p>
      <p>Category: {value.postCategory}</p>
      <div className="cardFooter">
        <button className="viewbtn" onClick={() => handleViewClick()}>
          View
        </button>
        {isBin ? (
          <>
            <button
              className="restorebtn"
              onClick={() => {
                restoreBinPost({ postData: value, uid: appState.user.uid })
                getUserBinPost({ uid: appState.user.uid, dispatch })
              }}
            >
              Restore
            </button>
            <button
              className="deletebtn"
              onClick={() => {
                deleteBinPost({ postId: value.id, uid: appState.user.uid })
                getUserBinPost({ uid: appState.user.uid, dispatch })
              }}
            >
              Delete
            </button>
          </>
        ) : value.authorUid === appState.user.uid ? (
          <>
            <button className="editbtn" onClick={() => handleEditClick()}>
              Edit
            </button>

            <button
              className="deletebtn"
              onClick={() => {
                moveTobin({ postData: value, uid: appState.user.uid })
                if (isSearchPost) {
                  dispatch({
                    type: DELETE_POST_FROM_SEARCH_POST_DATA,
                    payload: value.postId,
                  })
                }
              }}
            >
              Move To Bin
            </button>
          </>
        ) : null}
        {value.authorDetails ? (
          <p>Author Name: {value.authorDetails.name}</p>
        ) : (
          <p>Author Name: UnKnown</p>
        )}
      </div>
    </div>
  )
}

export default PostInfoCard
