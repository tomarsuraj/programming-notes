import {
  IS_AUTHTHENTICATED,
  SET_USER,
  UPDATE_EDITOR_STATE,
  UPDATE_POST_CATEGORY,
  UPDATE_POST_SAMPLE,
  UPDATE_POST_TITLE,
} from "./action.type";

export const appReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case IS_AUTHTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const addPostReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_EDITOR_STATE:
      return {
        ...state,
        editorState: action.payload,
      };

    case UPDATE_POST_TITLE:
      return {
        ...state,
        postTitle: action.payload,
      };

    case UPDATE_POST_SAMPLE:
      return {
        ...state,
        postSample: action.payload,
      };
    case UPDATE_POST_CATEGORY:
      return {
        ...state,
        postCategory: action.payload,
      };

    default:
      return state;
  }
};
