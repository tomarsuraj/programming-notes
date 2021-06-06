import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { firestore, storage } from "firebase";
import {
  CLEAR_POST_STATE,
  SET_USER_POST,
  SET_SEARCH_POST_DATA,
  SET_PUBLIC_POST_DATA,
  SET_USER_BIN_POST,
  SET_IS_LOADING,
} from "./action.type";
import { toast } from "react-toastify";

export const getUserPost = async ({ uid, dispatch }) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

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
      if (tempDoc.length == 0) {
        toast.warn("🦄 No Post Found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  } catch (error) {
    console.log("Error", error);
    toast(error.message, {
      type: "error",
    });
  }
};
export const getUserBinPost = async ({ uid, dispatch }) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

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
      if (tempDoc.length == 0) {
        toast.warn("🦄 No Post Found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  } catch (error) {
    console.log("Error", error);
    toast(error.message, {
      type: "error",
    });
  }
};

export const searchUserPost = async ({
  title,
  numberOfPost,
  category,
  dispatch,
  uid,
}) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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

          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: SET_SEARCH_POST_DATA, payload: tempDoc });
        });
    }
    dispatch({ type: SET_IS_LOADING, isLoading: false });
  } catch (error) {
    console.log("error", error);
    toast(error.message, {
      type: "error",
    });
  }
};

export const searchPublicPost = async ({
  title,
  numberOfPost,
  category,
  dispatch,
}) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
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
          if (tempDoc.length == 0) {
            toast.warn("🦄 No Post Found!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: SET_PUBLIC_POST_DATA, payload: tempDoc });
        });
    }
    dispatch({ type: SET_IS_LOADING, isLoading: false });
  } catch (error) {
    console.log("error", error);
    toast(error.message, {
      type: "error",
    });
  }
};

export const uploadPost = async ({
  postState,
  appState,
  postId,
  dispatch,
  history,
  initialState,
}) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

  const postBody = draftToHtml(
    convertToRaw(postState.editorState.getCurrentContent())
  );
  const editorStateRaw = convertToRaw(
    postState.editorState.getCurrentContent()
  );
  const uploadPost = await firestore()
    .collection("Users")
    .doc(appState.user.uid)
    .collection("post")
    .doc(postId);

  uploadPost
    .set({
      authorUid: appState.user.uid,
      editorStateRaw,
      isPrivate: postState.isPrivate,
      postId,
      postBody,
      postTitle: postState.postTitle,
      postSample: postState.postSample,
      postCategory: postState.postCategory,
      postImagesArray: postState.postImagesArray,
      timeStamp: firestore.Timestamp.now(),

      authorDetails: {
        name: appState.user.name,
        bio: appState.user.bio,
      },
    })
    .then(() => {
      toast.success("Private Post Uploaded.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: CLEAR_POST_STATE, payload: initialState });
      dispatch({ type: SET_IS_LOADING, payload: false });
      history.push("/");
    })
    .catch((error) => {
      toast(error.message, {
        type: "error",
      });
    });

  if (postState.isPrivate == false) {
    const uploadPost = await firestore().collection("PublicPost").doc(postId);

    uploadPost
      .set({
        postId,
        postBody,
        editorStateRaw,
        postTitle: postState.postTitle,
        postSample: postState.postSample,
        postCategory: postState.postCategory,
        authorUid: appState.user.uid,
        postImagesArray: postState.postImagesArray,
        isPrivate: postState.isPrivate,
        authorDetails: {
          name: appState.user.name,
          bio: appState.user.bio,
        },

        timeStamp: firestore.Timestamp.now(),
      })
      .then(() => {
        toast.success("Public Post Uploaded.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({ type: CLEAR_POST_STATE, payload: initialState });
        dispatch({ type: SET_IS_LOADING, payload: false });
      })
      .catch((error) =>
        toast(error.message, {
          type: "error",
        })
      );
  }
};

export const deletePublicPost = async ({ postId }) => {
  firestore()
    .collection("PublicPost")
    .doc(postId)
    .delete()
    .then(() => console.log("deletePublicPost"))
    .catch((error) =>
      toast(error.message, {
        type: "error",
      })
    );
};
export const deletePrivatePost = async ({ postId, uid }) => {
  firestore()
    .collection("Users")
    .doc(uid)
    .collection("post")
    .doc(postId)
    .delete()
    .then(() => console.log("deletePrivatePost"))
    .catch((error) =>
      toast(error.message, {
        type: "error",
      })
    );
};
export const deleteBinPost = async ({ postId, uid, isShowToast }) => {
  await firestore()
    .collection("Users")
    .doc(uid)
    .collection("bin")
    .doc(postId)
    .delete()
    .then(() => {
      if (isShowToast)
        toast.success("Post Deleted From Bin", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    })
    .catch((error) =>
      toast(error.message, {
        type: "error",
      })
    );
};

export const moveTobin = async ({ postData, uid }) => {
  firestore()
    .collection("Users")
    .doc(uid)
    .collection("bin")
    .doc(postData.id)
    .set(postData)
    .then(() =>
      toast.success("Post Move to bin.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    )
    .catch((error) =>
      toast(error.message, {
        type: "error",
      })
    );

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
    .then(() =>
      toast.success("Post Restore.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    )
    .catch((error) =>
      toast(error.message, {
        type: "error",
      })
    );

  if (!postData.isPrivate) {
    firestore()
      .collection("PublicPost")
      .doc(postData.id)
      .set(postData)
      .then(() =>
        toast.success("Post Restore.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((error) =>
        toast(error.message, {
          type: "error",
        })
      );
  }

  deleteBinPost({ postId: postData.id, uid, isShowToast: false });
};

export const deletePostDataFromStorage = async ({ postId, uid }) => {
  let ref = storage().ref(uid + "/" + postId);

  ref
    .listAll()
    .then((dir) => {
      dir.items.forEach((fileRef) => {
        var dirRef = storage().ref(fileRef.fullPath);
        dirRef.getDownloadURL().then(function (url) {
          var imgRef = storage().refFromURL(url);
          imgRef
            .delete()
            .then(function () {
              console.log("// File deleted successfully");
            })
            .catch(function (error) {
              console.log("// There has been an error");
            });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
