import {
  CLEAR_APP_STATE,
  CLEAR_POST_STATE,
  REMOVE_MOVE_TO_BIN_POST,
  IS_AUTHTHENTICATED,
  IS_EMAIL_VERIFIED,
  IS_SIGNIN,
  SET_EDIT_POST_DATA,
  SET_EDIT_POST_STATE,
  SET_IS_LOADING,
  SET_IS_PRIVATE,
  SET_LAST_USER_QUEARY_DOC,
  SET_PUBLIC_POST,
  SET_USER,
  SET_USER_BIN_POST,
  SET_USER_POST,
  SET_VIEW_POST_DATA,
  UPDATE_EDITOR_STATE,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_ID,
  UPDATE_POST_SAMPLE,
  UPDATE_POST_TITLE,
  UPDATE_PUBLIC_POST,
  UPDATE_USER_POST,
} from "./action.type";

// Editior
import { EditorState, convertFromRaw } from "draft-js";

const appInitialState = {
  isAuthenticated: false,
  isEmailVerified: false,
  isSignIn: false,
  user: {},
  post: {},
  BinPostData: {},
  viewPostData: {},
  editPostData: {},
  publicPost: {},
  isLoading: false,
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case CLEAR_APP_STATE:
      return appInitialState;

    case IS_AUTHTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case IS_EMAIL_VERIFIED:
      return {
        ...state,
        isEmailVerified: action.payload,
      };
    case IS_SIGNIN:
      return {
        ...state,
        isSignIn: action.payload,
      };

    case REMOVE_MOVE_TO_BIN_POST: {
      const { post, publicPost } = state;
      return {
        ...state,
        post: post.filter((postinfo) => postinfo.postId !== action.payload),
        publicPost: publicPost.filter(
          (postinfo) => postinfo.postId !== action.payload
        ),
      };
    }
    case SET_EDIT_POST_DATA:
      return { ...state, editPostData: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_LAST_USER_QUEARY_DOC:
      return { ...state, lastUserQuearyDoc: action.payload };
    case SET_PUBLIC_POST:
      return { ...state, publicPost: action.payload };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER_BIN_POST:
      return {
        ...state,
        BinPostData: action.payload,
      };
    case SET_USER_POST:
      return {
        ...state,
        post: action.payload,
      };

    case SET_VIEW_POST_DATA:
      return {
        ...state,
        viewPostData: action.payload,
      };
    case UPDATE_PUBLIC_POST:
      const { publicPost } = state;
      const newPublicPost = Object.values(publicPost).concat(action.payload);

      return {
        ...state,
        publicPost: newPublicPost,
      };

    case UPDATE_USER_POST:
      const { post } = state;
      const newPost = Object.values(post).concat(action.payload);

      return {
        ...state,
        post: newPost,
      };

    default:
      return state;
  }
};

// Reducer of Add Post Page
export const addPostReducer = (state, action) => {
  switch (action.type) {
    case CLEAR_POST_STATE:
      return action.payload;
    case SET_EDIT_POST_STATE: {
      const DBEditorState = convertFromRaw(action.payload.editorStateRaw);

      const editorState = EditorState.createWithContent(DBEditorState);
      return {
        ...state,
        postId: action.payload.postId,
        postTitle: action.payload.postTitle,
        postSample: action.payload.postSample,
        postCategory: action.payload.postCategory,
        isPrivate: action.payload.isPrivate,
        editorState: editorState,
        postImagesArray: action.payload.postImagesArray,
      };
    }
    case SET_IS_PRIVATE:
      return {
        ...state,
        isPrivate: action.payload,
      };
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        editorState: action.payload,
      };
    case UPDATE_POST_CATEGORY:
      return {
        ...state,
        postCategory: action.payload,
      };
    case UPDATE_POST_ID:
      return {
        ...state,
        postId: action.payload,
      };
    case UPDATE_POST_SAMPLE:
      return {
        ...state,
        postSample: action.payload,
      };

    case UPDATE_POST_TITLE:
      return {
        ...state,
        postTitle: action.payload,
      };

    default:
      return state;
  }
};
