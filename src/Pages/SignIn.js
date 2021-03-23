import { apps, auth } from 'firebase'
import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../context/context'
import Loading from './Loading'

const SignIn = () => {
  const { appState } = useContext(UserContext)

  const [email, setEmail] = useState('@gmail.com')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        toast('Sign In', {
          type: 'success',
        })
      })
      .catch((error) => {
        console.log(error)
        toast(error.message, {
          type: 'error',
        })
      })
  }

  if (!appState.isEmailVerified && appState.isSignIn) {
    return <Redirect to="/verifyEmail" />
  }

  if (appState.isLoading) {
    return <Loading />
  }
  return (
    <div className="screenContainer">
      <h1 className="heading">Sign in</h1>
      <div className="authContainer">
        <label for="email">Email:</label>
        <input
          type="email"
          name="email"
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => handleSignIn()}>Sign Up</button>
        <p>
          Don’t have an account?{' '}
          <Link to="/signUp" style={{ color: '#35BDD0' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
