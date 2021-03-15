import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { firestore } from "firebase";
import {
  CLEAR_POST_STATE,
  SET_USER_POST,
  SET_SEARCH_POST_DATA,
  SET_PUBLIC_POST_DATA,
  SET_USER_BIN_POST,
} from "./action.type";


export const getUserPost = async ({ uid, dispatch }) => {
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

      dispatch({ type: SET_USER_POST, payload: tempDoc });
    });
  } catch (error) {
    console.log("Error", error);
  }
};
export const getUserBinPost = async ({ uid, dispatch }) => {
  try {
    const post = await firestore()
      .collection("Users")
      .doc(uid)
      .collection("bin")
      .orderBy("timeStamp", "desc");

    post.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: SET_USER_BIN_POST, payload: tempDoc });
    });
  } catch (error) {
    console.log("Error", error);
  }
};

export const searchUserPost = async ({
  title,
  numberOfPost,
  category,
  dispatch,
  uid,
}) => {
  console.log(
    "title",
    title,
    "number of post",
    numberOfPost,
    "category",
    category
  );
  try {
    const post = await firestore()
      .collection("Users")
      .doc(uid)
      .collection("post");
    if (title !== "" && category !== "All") {
      post
        .where("postTitle", "==", title)
        .where("postCategory", "==", category)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_SEARCH_POST_DATA, payload: tempDoc });
        });
    } else if (title === "" && numberOfPost !== 0 && category !== "All") {
      post
        .where("postCategory", "==", category)
        .orderBy("timeStamp", "desc")
        .limit(numberOfPost)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_SEARCH_POST_DATA, payload: tempDoc });
        });
    } else if (title === "" && numberOfPost == 0 && category !== "All") {
      post
        .where("postCategory", "==", category)
        .orderBy("timeStamp", "desc")
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_SEARCH_POST_DATA, payload: tempDoc });
        });
    } else if (title !== "" && category === "All") {
      post
        .where("postTitle", "==", title)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_SEARCH_POST_DATA, payload: tempDoc });
        });
    } else if (title === "" && numberOfPost !== 0 && category === "All") {
      post
        .orderBy("timeStamp", "desc")
        .limit(numberOfPost)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_SEARCH_POST_DATA, payload: tempDoc });
        });
    } else {
      post
        .orderBy("timeStamp", "desc")
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_SEARCH_POST_DATA, payload: tempDoc });
        });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const searchPublicPost = async ({
  title,
  numberOfPost,
  category,
  dispatch,
}) => {
  try {
    const post = await firestore().collection("PublicPost");
    if (title !== "" && category !== "All") {
      post
        .where("postTitle", "==", title)
        .where("postCategory", "==", category)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_PUBLIC_POST_DATA, payload: tempDoc });
        });
    } else if (title === "" && numberOfPost !== 0 && category !== "All") {
      post
        .where("postCategory", "==", category)
        .orderBy("timeStamp", "desc")
        .limit(numberOfPost)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_PUBLIC_POST_DATA, payload: tempDoc });
        });
    } else if (title === "" && numberOfPost == 0 && category !== "All") {
      post
        .where("postCategory", "==", category)
        .orderBy("timeStamp", "desc")
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_PUBLIC_POST_DATA, payload: tempDoc });
        });
    } else if (title !== "" && category === "All") {
      post
        .where("postTitle", "==", title)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_PUBLIC_POST_DATA, payload: tempDoc });
        });
    } else if (title === "" && numberOfPost !== 0 && category === "All") {
      post
        .orderBy("timeStamp", "desc")
        .limit(numberOfPost)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_PUBLIC_POST_DATA, payload: tempDoc });
        });
    } else {
      post
        .orderBy("timeStamp", "desc")
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          dispatch({ type: SET_PUBLIC_POST_DATA, payload: tempDoc });
        });
    }
  } catch (error) {
    console.log("error", error);
  }
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
export const deletePrivatePost = async ({ postId, uid }) => {
  firestore()
    .collection("Users")
    .doc(uid)
    .collection("post")
    .doc(postId)
    .delete()
    .then(() => console.log("Public Post Deleted"))
    .catch((error) => console.log("Error", error));
};
export const deleteBinPost = async ({ postId, uid }) => {
  firestore()
    .collection("Users")
    .doc(uid)
    .collection("bin")
    .doc(postId)
    .delete()
    .then(() => console.log("Public Post Deleted"))
    .catch((error) => console.log("Error", error));
};

export const moveTobin = async ({ postData, uid }) => {
  firestore()
    .collection("Users")
    .doc(uid)
    .collection("bin")
    .doc(postData.id)
    .set(postData)
    .then(() => console.log("Post move to bin"))
    .catch((error) => console.log("error", error));

  deletePublicPost({ postId: postData.id });
  deletePrivatePost({ postId: postData.id, uid });
};
export const restoreBinPost = async ({ postData, uid }) => {
  firestore()
    .collection("Users")
    .doc(uid)
    .collection("post")
    .doc(postData.id)
    .set(postData)
    .then(() => console.log("Post move to bin"))
    .catch((error) => console.log("error", error));

  if (!postData.isPrivate) {
    firestore()
      .collection("PublicPost")
      .doc(postData.id)
      .set(postData)
      .then(() => console.log("Post move to bin"))
      .catch((error) => console.log("error", error));
  }

  deleteBinPost({ postId: postData.id, uid });
};
