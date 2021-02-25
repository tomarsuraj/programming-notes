import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { firestore } from "firebase";
import { CLEAR_POST_STATE } from "./action.type";

export const uploadPost = async ({
  postState,
  appState,
  postId,
  dispatch,
  initialState,
}) => {
  const postBody = draftToHtml(
    convertToRaw(postState.editorState.getCurrentContent())
  );

  await firestore()
    .collection("Users")
    .doc(appState.user.uid)
    .collection("post")
    .doc(postId)
    .set({
      postId,
      postBody,
      postTitle: postState.postTitle,
      postSample: postState.postSample,
      postCategory: postState.postCategory,
    })
    .then(() => {
      console.log("Post upload");
      dispatch({ type: CLEAR_POST_STATE, payload: initialState });
    })
    .catch((error) => console.log("Error", error));
};
