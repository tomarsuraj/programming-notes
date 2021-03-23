import { auth } from 'firebase'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignIn = () => {
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
