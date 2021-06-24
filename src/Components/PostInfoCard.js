import React, { useContext } from "react";
import { UserContext } from "../context/context";
import { useHistory } from "react-router-dom";

import {
  deleteBinPost,
  getUserBinPost,
  moveTobin,
  restoreBinPost,
} from "../context/databasefunction";

import {
  REMOVE_MOVE_TO_BIN_POST,
  SET_EDIT_POST_DATA,
  SET_VIEW_POST_DATA,
} from "../context/action.type";

const PostInfoCard = ({ isBin, value, isPrivate }) => {
  const { appState, dispatch } = useContext(UserContext);
  const history = useHistory();

  const handleViewClick = () => {
    if (appState.isAuthenticated && value.isPrivate) {
      dispatch({ type: SET_VIEW_POST_DATA, payload: value });
      history.push("viewPost");
    } else {
      history.push("publicPost/" + value.id);
      dispatch({ type: SET_VIEW_POST_DATA, payload: value });
    }
  };

  const handleEditClick = () => {
    dispatch({ type: SET_EDIT_POST_DATA, payload: value });
    history.push("/post/editpost");
  };
  return (
    <div className="col col-sm-12 col-md-12 col-lg-6 ">
      <div className="card bg-transparent myborder-3 myborder-success  mt-4">
        <div className="card-header mybg-grey d-flex justify-content-between">
          <h2 className=" mytext-warning">{value.postTitle}</h2>
        </div>
        <div className="card-body">
          <p>{value.postSample}</p>
          <h5 className="mytext-success">
            <strong>Category: </strong>
            {value.postCategory}
          </h5>
          <h6 className="mytext-success">
            <strong> Privacy: </strong>
            {value.isPrivate ? "Private" : "Public"}
          </h6>
          {value.authorDetails ? (
            <p className="float-end mytext-success">
              Author Name: {value.authorDetails.name}
            </p>
          ) : (
            <p className="float-end">Author Name: UnKnown</p>
          )}
        </div>

        <div className="card-footer border-top">
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <button className="mybtn" onClick={() => handleViewClick()}>
                View
              </button>
            </div>

            {isBin && value.authorUid === appState.user.uid ? (
              <>
                <div className="col-md-4 col-sm-6">
                  <button
                    className="mybtn mybtn-success"
                    onClick={() => {
                      restoreBinPost({
                        postData: value,
                        uid: appState.user.uid,
                      });
                      getUserBinPost({ uid: appState.user.uid, dispatch });
                    }}
                  >
                    Restore
                  </button>
                </div>
                <div className="col-md-4 col-sm-12">
                  <button
                    className="mybtn mybtn-danger"
                    onClick={() => {
                      deleteBinPost({
                        postId: value.id,
                        uid: appState.user.uid,
                        isShowToast: true,
                      });
                      getUserBinPost({ uid: appState.user.uid, dispatch });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : value.authorUid === appState.user.uid ? (
              <>
                <div className="col-md-4 col-sm-6">
                  <button
                    className="mybtn mybtn-success"
                    onClick={() => handleEditClick()}
                  >
                    Edit
                  </button>
                </div>
                <div className="col-md-4 col-sm-12">
                  <button
                    className="mybtn mybtn-warning"
                    onClick={() => {
                      moveTobin({ postData: value, uid: appState.user.uid });

                      dispatch({
                        type: REMOVE_MOVE_TO_BIN_POST,
                        payload: value.postId,
                      });
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
    </div>
  );
};

export default PostInfoCard;
