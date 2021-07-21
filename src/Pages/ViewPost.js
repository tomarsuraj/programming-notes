import React, { useContext } from 'react';
import { UserContext } from '../context/context';
import { SET_EDIT_POST_DATA } from '../context/action.type';
import { useHistory } from 'react-router';
import ReactQuill from 'react-quill';

const ViewPost = () => {
  const { appState, dispatch } = useContext(UserContext);
  const history = useHistory();
  const { viewPostData } = appState;

  const handleEditClick = () => {
    dispatch({ type: SET_EDIT_POST_DATA, payload: viewPostData });
    history.push('post/editpost');
  };

  return (
    <div className="myborder-3 myborder-light-grey  p-4 mt-4">
      <div>
        {viewPostData ? (
          <>
            <div className="border-bottom">
              <h2>{viewPostData.postTitle}</h2>
            </div>

            <ReactQuill
              value={viewPostData.editorState}
              readOnly={true}
              theme={'bubble'}
            />
          </>
        ) : (
          <h4>No Post Data</h4>
        )}
      </div>
      <div className="mt-3 border-top">
        <button className="mybtn" onClick={() => handleEditClick()}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
