import {
  CLEAR_POST_STATE,
  UPDATE_PUBLIC_POST,
  SET_USER_BIN_POST,
  SET_IS_LOADING,
  SET_VIEW_POST_DATA,
  SET_LAST_USER_QUEARY_DOC,
  UPDATE_USER_POST,
} from './action.type';
import { toast } from 'react-toastify';
// firebase
import firebase from 'firebase/app';

export const deleteBinPost = async ({ postId, uid, isShowToast }) => {
  await firebase
    .firestore()
    .collection('Users')
    .doc(uid)
    .collection('bin')
    .doc(postId)
    .delete()
    .then(() => {
      if (isShowToast)
        toast.success('Post Deleted From Bin', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    })
    .catch((error) =>
      toast('Error in Deleting Post Form Bin ' + error.message, {
        type: 'error',
      })
    );
};
export const deletePrivatePost = async ({ postId, uid }) => {
  firebase
    .firestore()
    .collection('Users')
    .doc(uid)
    .collection('post')
    .doc(postId)
    .delete()
    .then(() => console.log('deletePrivatePost'))
    .catch((error) =>
      toast('Error in Deleting Post ' + error.message, {
        type: 'error',
      })
    );
};
export const deletePublicPost = async ({ postId }) => {
  firebase
    .firestore()
    .collection('PublicPost')
    .doc(postId)
    .delete()
    .then(() => console.log('deletePublicPost'))
    .catch((error) =>
      toast('Error in Deleting Post ' + error.message, {
        type: 'error',
      })
    );
};

export const getPublicPost = async ({ postId, dispatch }) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

  const post = await firebase.firestore().collection('PublicPost').doc(postId);
  post.get().then((doc) => {
    if (doc.exists) {
      dispatch({ type: SET_VIEW_POST_DATA, payload: doc.data() });
      dispatch({ type: SET_IS_LOADING, payload: false });
    } else {
      dispatch({ type: SET_IS_LOADING, payload: false });

      console.log('No such document!');
      dispatch({ type: SET_VIEW_POST_DATA, payload: null });
      toast('No such document!  ', {
        type: 'error',
      });
    }
  });
};

export const getUserBinPost = async ({ uid, dispatch }) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

  try {
    const post = await firebase
      .firestore()
      .collection('Users')
      .doc(uid)
      .collection('bin')
      .orderBy('timeStamp', 'desc');

    post.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      dispatch({ type: SET_USER_BIN_POST, payload: tempDoc });
      dispatch({ type: SET_IS_LOADING, payload: false });

      if (tempDoc.length === 0) {
        toast.warn('🦄 No Post Found!', {
          position: 'top-right',
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
    console.log('Error', error);
    toast(error.message, {
      type: 'error',
    });
  }
};

export const moveTobin = async ({ postData, uid }) => {
  firebase
    .firestore()
    .collection('Users')
    .doc(uid)
    .collection('bin')
    .doc(postData.id)
    .set(postData)
    .then(() =>
      toast.success('Post Move to bin.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    )
    .catch((error) =>
      toast('Error in moving Post to Bin ' + error.message, {
        type: 'error',
      })
    );
  deletePrivatePost({ postId: postData.id, uid });

  if (!postData.isPrivate) {
    deletePublicPost({ postId: postData.id });
  }
};
export const restoreBinPost = async ({ postData, uid }) => {
  firebase
    .firestore()
    .collection('Users')
    .doc(uid)
    .collection('post')
    .doc(postData.id)
    .set(postData)
    .then(() =>
      toast.success('Post Restore.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    )
    .catch((error) =>
      toast('Error in restoring Private version of Post ' + error.message, {
        type: 'error',
      })
    );

  if (!postData.isPrivate) {
    firebase
      .firestore()
      .collection('PublicPost')
      .doc(postData.id)
      .set(postData)
      .then(() => console.log('Public Version of post restore'))
      .catch((error) =>
        toast('Error in restoring Public version of Post ' + error.message, {
          type: 'error',
        })
      );
  }

  deleteBinPost({ postId: postData.id, uid, isShowToast: false });
};

export const searchPublicPost = async ({
  title,
  category,
  dispatch,
  lastDoc,
}) => {
  try {
    dispatch({ type: SET_IS_LOADING, payload: true });

    const post = await firebase.firestore().collection('PublicPost');
    if (title !== '' && category !== 'All') {
      post
        .where('arrayForSearch', 'array-contains', title.toLowerCase())
        .where('postCategory', '==', category)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (tempDoc.length === 0) {
            toast.warn('🦄 No Post Found!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: UPDATE_PUBLIC_POST, payload: tempDoc });
        });
    } else if (title === '' && category !== 'All') {
      post
        .where('postCategory', '==', category)
        .orderBy('timeStamp', 'desc')
        .startAfter(lastDoc)
        .limit(20)
        .get()
        .then((querySnapshot) => {
          dispatch({
            type: SET_LAST_USER_QUEARY_DOC,
            payload: querySnapshot.docs[querySnapshot.docs.length - 1],
          });
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (tempDoc.length === 0) {
            toast.warn('🦄 No Post Found!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: UPDATE_PUBLIC_POST, payload: tempDoc });
          console.log('tempDoc', tempDoc);
        });
    } else if (title !== '' && category === 'All') {
      post
        .where('arrayForSearch', 'array-contains', title.toLowerCase())
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (tempDoc.length === 0) {
            toast.warn('🦄 No Post Found!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: UPDATE_PUBLIC_POST, payload: tempDoc });
        });
    } else {
      post
        .orderBy('timeStamp', 'desc')
        .startAfter(lastDoc)
        .limit(20)
        .get()
        .then((querySnapshot) => {
          dispatch({
            type: SET_LAST_USER_QUEARY_DOC,
            payload: querySnapshot.docs[querySnapshot.docs.length - 1],
          });
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (tempDoc.length === 0) {
            toast.warn('🦄 No Post Found!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: UPDATE_PUBLIC_POST, payload: tempDoc });
        });
    }
    dispatch({ type: SET_IS_LOADING, payload: false });
  } catch (error) {
    console.log('error', error);
    toast(error.message, {
      type: 'error',
    });
  }
};
export const searchUserPost = async ({
  title,
  category,
  dispatch,
  uid,
  lastDoc,
}) => {
  try {
    dispatch({ type: SET_IS_LOADING, payload: true });

    const post = await firebase
      .firestore()
      .collection('Users')
      .doc(uid)
      .collection('post');
    if (title !== '' && category !== 'All') {
      post
        .where('arrayForSearch', 'array-contains', title)
        .where('postCategory', '==', category)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (tempDoc.length === 0) {
            toast.warn('🦄 No Post Found!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: UPDATE_USER_POST, payload: tempDoc });
        });
    } else if (title === '' && category !== 'All') {
      post
        .where('postCategory', '==', category)
        .orderBy('timeStamp', 'desc')
        .startAfter(lastDoc)
        .limit(20)
        .get()
        .then((querySnapshot) => {
          dispatch({
            type: SET_LAST_USER_QUEARY_DOC,
            payload: querySnapshot.docs[querySnapshot.docs.length - 1],
          });
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (tempDoc.length === 0) {
            toast.warn('🦄 No Post Found!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: UPDATE_USER_POST, payload: tempDoc });
        });
    } else if (title !== '' && category === 'All') {
      post
        .where('arrayForSearch', 'array-contains', title)
        .get()
        .then((querySnapshot) => {
          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (tempDoc.length === 0) {
            toast.warn('🦄 No Post Found!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: UPDATE_USER_POST, payload: tempDoc });
        });
    } else {
      post
        .orderBy('timeStamp', 'desc')
        .startAfter(lastDoc)
        .limit(20)
        .get()
        .then((querySnapshot) => {
          dispatch({
            type: SET_LAST_USER_QUEARY_DOC,
            payload: querySnapshot.docs[querySnapshot.docs.length - 1],
          });

          const tempDoc = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (tempDoc.length === 0) {
            toast.warn('🦄 No Post Found!', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          dispatch({ type: UPDATE_USER_POST, payload: tempDoc });
        });
    }
    dispatch({ type: SET_IS_LOADING, payload: false });
  } catch (error) {
    console.log('error', error);
    toast(error.message, {
      type: 'error',
    });
  }
};

export const uploadPost = async ({
  postState,
  appState,
  dispatch,
  history,
  initialState,
}) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

  const { postId } = postState;

  let arrayForSearch = [];
  const postTitleWords = postState.postTitle.split(' ');

  postTitleWords.forEach((t) => {
    if (t) arrayForSearch.push(t.toLowerCase());
  });
  arrayForSearch.push(postState.postTitle.toLowerCase());

  const uploadPost = await firebase
    .firestore()
    .collection('Users')
    .doc(appState.user.uid)
    .collection('post')
    .doc(postId);

  uploadPost
    .set({
      authorDetails: {
        name: appState.user.name,
        bio: appState.user.bio,
      },
      authorUid: appState.user.uid,
      isPrivate: postState.isPrivate,
      editorState: postState.editorState,
      postCategory: postState.postCategory,
      postId,
      arrayForSearch,
      postTitle: postState.postTitle,
      postSample: postState.postSample,
      timeStamp: firebase.firestore.Timestamp.now(),
    })
    .then(() => {
      toast.success('Private Post Uploaded.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: CLEAR_POST_STATE, payload: initialState });
      dispatch({ type: SET_IS_LOADING, payload: false });
      history.push('/home');
    })
    .catch((error) => {
      toast('Error in Uploding Private Version of Post ' + error.message, {
        type: 'error',
      });
    });

  if (postState.isPrivate === false) {
    const uploadPost = await firebase
      .firestore()
      .collection('PublicPost')
      .doc(postId);

    uploadPost
      .set({
        authorDetails: {
          name: appState.user.name,
          bio: appState.user.bio,
        },

        authorUid: appState.user.uid,
        editorState: postState.editorState,
        isPrivate: postState.isPrivate,
        postCategory: postState.postCategory,
        postId,
        arrayForSearch,
        postTitle: postState.postTitle,
        postSample: postState.postSample,

        timeStamp: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        toast.success('Public Post Uploaded.', {
          position: 'top-right',
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
        toast(
          ('Error in Uploding Public Version of Post ' + error.message,
          {
            type: 'error',
          })
        )
      );
  }
};
