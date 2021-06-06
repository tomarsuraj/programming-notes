import React, { useReducer } from 'react'

import App from './App'

//Context
import { UserContext } from './context/context'
import { appReducer } from './context/reducer'

// firebase
import { firebaseConfig } from './config'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

firebase.initializeApp(firebaseConfig)

const initialState = {
  isAuthenticated: false,
  isEmailVerified: false,
  isSignIn: false,
  user: {},
  post: {},
  BinPostData: {},
  viewPostData: {},
  editPostData: {},
  searchPostData: {},
  searchPublicData: {},
  isLoading: false,
}

const RootApp = () => {
  const [appState, dispatch] = useReducer(appReducer, initialState)

  return (
    <UserContext.Provider value={{ appState: appState, dispatch,}}>
      <App />
    </UserContext.Provider>
  )
}

export default RootApp
