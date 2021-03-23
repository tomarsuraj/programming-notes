import React, { useContext, useEffect, useState } from 'react'
import './app.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from 'react-router-dom'

//toast
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { UserContext } from './context/context'

// Pages
import Home from './Pages/Home'
import AddPost from './Pages/AddPost'
import ViewPost from './Pages/ViewPost'
import EditPost from './Pages/EditPost'
import SearchPost from './Pages/SearchPost'
import Explore from './Pages/Explore'
import Bin from './Pages/Bin'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import NotFound from './Pages/NotFound'

// Components
import Header from './Components/Header'

import {
  IS_AUTHTHENTICATED,
  IS_EMAIL_VERIFIED,
  SET_USER,
} from './context/action.type'
import { auth, firestore } from 'firebase'

import { getUserPost } from './context/databasefunction'
import VerifyEmail from './Pages/VerifyEmail'

const App = () => {
  const { dispatch, appState } = useContext(UserContext)
  const { user } = appState
  const history = useHistory()

  const onAuthStateChanged = async (user) => {
    if (user) {
      dispatch({ type: IS_AUTHTHENTICATED, payload: true })

      firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          dispatch({ type: SET_USER, payload: doc.data() })
        })

      if (!user.emailVerified) {
        dispatch({ type: IS_EMAIL_VERIFIED, payload: false })
        console.log('verif if calle')
        user
          .sendEmailVerification()
          .then(function () {
            console.log('Email send')
          })
          .catch(function (error) {
            console.log('error', error)
          })
      } else {
        dispatch({ type: IS_EMAIL_VERIFIED, payload: true })
      }
    } else {
      dispatch({ type: IS_AUTHTHENTICATED, payload: false })
    }
  }

  useEffect(() => {
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged)
    return susbcriber
  }, [])

  useEffect(() => {
    if (user.uid) getUserPost({ uid: user.uid, dispatch })
  }, [user.uid])

  if (appState.isAuthenticated && appState.isEmailVerified) {
    return (
      <Router>
        <ToastContainer />

        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/addPost" component={AddPost} />
          <Route exact path="/viewPost" component={ViewPost} />
          <Route exact path="/editPost" component={EditPost} />
          <Route exact path="/searchPost" component={SearchPost} />
          <Route exact path="/explore" component={Explore} />
          <Route exact path="/bin" component={Bin} />

          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    )
  } else if (appState.isAuthenticated && !appState.isEmailVerified) {
    return <VerifyEmail />
  } else {
    return (
      <Router>
        <ToastContainer />

        <Header />
        <Switch>
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />

          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
