import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { firestore } from "firebase";
import { CLEAR_POST_STATE, SET_USER_POST } from "./action.type";

export const getUserPost = async ({ uid, dispatch }) => {
  console.log("Get user ost called");

  try {
    const post = await firestore()
      .collection("Users")
      .doc(uid)
      .collection("post")
      .orderBy("timeStamp", "desc")
      .limit(4);

    post.onSnapshot((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: "SET_USER_POST", payload: tempDoc });
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const searchUserPost = async ({}) => {
  //write Code
};

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

  const uploadPost = await firestore()
    .collection("Users")
    .doc(appState.user.uid)
    .collection("post")
    .doc(postId);

  uploadPost
    .set({
      postId,
      postBody,
      postTitle: postState.postTitle,
      postSample: postState.postSample,
      postCategory: postState.postCategory,
      authorUid: appState.user.uid,
      isPrivate: postState.isPrivate,
      timeStamp: firestore.Timestamp.now(),
    })
    .then(() => {
      console.log("Post upload");
      dispatch({ type: CLEAR_POST_STATE, payload: initialState });
    })
    .catch((error) => console.log("Error", error));

  if (postState.isPrivate == false) {
    const uploadPost = await firestore().collection("PublicPost").doc(postId);

    uploadPost
      .set({
        postId,
        postBody,
        postTitle: postState.postTitle,
        postSample: postState.postSample,
        postCategory: postState.postCategory,
        authorUid: appState.user.uid,
        isPrivate: postState.isPrivate,
        timeStamp: firestore.Timestamp.now(),
      })
      .then(() => {
        console.log("Public Post upload");
        dispatch({ type: CLEAR_POST_STATE, payload: initialState });
      })
      .catch((error) => console.log("Error", error));
  }
};

export const deletePublicPost = async ({ postId }) => {
  firestore()
    .collection("PublicPost")
    .doc(postId)
    .delete()
    .then(() => console.log("Public Post Deleted"))
    .catch((error) => console.log("Error", error));
};
