import React, { useContext } from "react";
import { UserContext } from "../context/context";
import { useHistory } from "react-router-dom";
import {
  DELETE_POST_FROM_SEARCH_POST_DATA,
  SET_EDIT_POST_DATA,
  SET_VIEW_POST_DATA,
} from "../context/action.type";
import {
  deleteBinPost,
  deletePostDataFromStorage,
  getUserBinPost,
  moveTobin,
  restoreBinPost,
} from "../context/databasefunction";

const PostInfoCard = ({ isBin, value, isSearchPost, isPrivate }) => {
  const { appState, dispatch } = useContext(UserContext);
  const history = useHistory();

  const handleViewClick = () => {
    dispatch({ type: SET_VIEW_POST_DATA, payload: value });
    history.push("viewPost");
  };

  const handleEditClick = () => {
    dispatch({ type: SET_EDIT_POST_DATA, payload: value });
    history.push("/post/editpost");
  };
  return (
    <div className="card bg-transparent mt-4 myborder-green">
      <div className="card-header">
        <h2 className=" mytext-blue">{value.postTitle}</h2>
      </div>
      <div className="card-body">
        <p>{value.postSample}</p>
        <p className="mytext-orange">Category: {value.postCategory}</p>
        <p className="mytext-blue">
          Privacy : {value.isPrivate ? "Private" : "Public"}
        </p>
        {value.authorDetails ? (
          <p className="float-end mytext-green">
            Author Name: {value.authorDetails.name}
          </p>
        ) : (
          <p className="float-end">Author Name: UnKnown</p>
        )}
      </div>

      <div className="card-footer">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <button className="mybtn " onClick={() => handleViewClick()}>
              View
            </button>
          </div>

          {isBin ? (
            <>
              <div className="col-md-4 col-sm-6">
                <button
                  className="mybtn mybtn-orange "
                  onClick={() => {
                    restoreBinPost({ postData: value, uid: appState.user.uid });
                    getUserBinPost({ uid: appState.user.uid, dispatch });
                  }}
                >
                  Restore
                </button>
              </div>
              <div className="col-md-4 col-sm-12">
                <button
                  className="mybtn mybtn-red "
                  onClick={() => {
                    deleteBinPost({
                      postId: value.id,
                      uid: appState.user.uid,
                      isShowToast: true,
                    });
                    getUserBinPost({ uid: appState.user.uid, dispatch });
                    deletePostDataFromStorage({
                      postId: value.id,
                      uid: appState.user.uid,
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          ) : isPrivate ? (
            <>
              <div className="col-md-4 col-sm-6">
                <button
                  className="mybtn mybtn-blue "
                  onClick={() => handleEditClick()}
                >
                  Edit
                </button>
              </div>
              <div className="col-md-4 col-sm-12">
                <button
                  className="mybtn mybtn-orange "
                  onClick={() => {
                    moveTobin({ postData: value, uid: appState.user.uid });
                    if (isSearchPost) {
                      dispatch({
                        type: DELETE_POST_FROM_SEARCH_POST_DATA,
                        payload: value.postId,
                      });
                    }
                  }}
                >
                  Move To Bin
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostInfoCard;
