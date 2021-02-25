import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { firestore } from "firebase";

export const uploadPost = async ({ postState, appState, postId }) => {
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
    .then(() => console.log("Post upload"))
    .catch((error) => console.log("Error", error));
};
