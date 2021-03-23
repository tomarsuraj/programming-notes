import React, { useContext, useEffect, useState } from 'react'
import './app.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
  IS_SIGNIN,
  SET_IS_LOADING,
  SET_USER,
} from './context/action.type'
import { auth, firestore } from 'firebase'

import { getUserPost } from './context/databasefunction'
import VerifyEmail from './Pages/VerifyEmail'
import Loading from './Pages/Loading'

const App = () => {
  const { dispatch, appState } = useContext(UserContext)
  const { user } = appState
  const { isAuthenticated } = appState

  const onAuthStateChanged = async (user) => {
    if (user) {
      dispatch({ type: IS_SIGNIN, payload: true })

      if (!user.emailVerified) {
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
        dispatch({ type: IS_AUTHTHENTICATED, payload: true })
      }

      await firestore()
        .collection('Users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          dispatch({ type: SET_USER, payload: doc.data() })
          dispatch({ type: SET_IS_LOADING, payload: false })
        })

      console.log('USer', user)
    } else {
      dispatch({ type: SET_IS_LOADING, payload: false })
    }
  }

  useEffect(() => {
    dispatch({ type: SET_IS_LOADING, payload: true })

    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged)
    return susbcriber
  }, [])

  useEffect(() => {
    if (user.uid) getUserPost({ uid: user.uid, dispatch })
  }, [user.uid])

  return (
    <Router>
      <ToastContainer />

      <Header />
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Home /> : <Redirect to="/signIn" />}
        </Route>
        <Route exact path="/addPost" component={AddPost}>
          {isAuthenticated ? <AddPost /> : <Redirect to="/signIn" />}
        </Route>
        <Route exact path="/viewPost" component={ViewPost}>
          {isAuthenticated ? <ViewPost /> : <Redirect to="/signIn" />}
        </Route>
        <Route exact path="/editPost" component={EditPost}>
          {isAuthenticated ? <EditPost /> : <Redirect to="/signIn" />}
        </Route>
        <Route exact path="/searchPost" component={SearchPost}>
          {isAuthenticated ? <SearchPost /> : <Redirect to="/signIn" />}
        </Route>
        <Route exact path="/explore" component={Explore}>
          {isAuthenticated ? <Explore /> : <Redirect to="/signIn" />}
        </Route>

        <Route exact path="/bin" component={NotFound}>
          {isAuthenticated ? <Bin /> : <SignIn />}
        </Route>
        <Route exact path="/signIn">
          {isAuthenticated ? <Redirect to="/" /> : <SignIn />}
        </Route>
        <Route exact path="/signUp" component={SignUp}>
          {isAuthenticated ? <Redirect to="/" /> : <SignUp />}
        </Route>
        <Route exact path="/verifyEmail" component={VerifyEmail} />

        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
