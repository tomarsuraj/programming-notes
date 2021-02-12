import { IS_AUTHTHENTICATED, SET_USER } from "./action.type";

export default (state, action) => {
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
