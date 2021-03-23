import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, firestore } from 'firebase'

const SignUp = () => {
  const [email, setEmail] = useState('@gmail.com')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  const handleSignUp = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        firestore()
          .collection('Users')
          .doc(data.user.uid)
          .set({
            name,
            email,
            bio,
            uid: data.user.uid,
          })
          .then(() => {
            toast('Sign Up successfully', {
              type: 'success',
            })
          })
      })

      .catch((error) => {
        console.log('Error', error)
        toast(error.message, {
          type: 'error',
        })
      })
  }
  return (
    <div className="screenContainer">
      <h1 className="heading">Sign Up</h1>
      <div className="authContainer">
        <label for="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <label for="bio">Bio:</label>
        <input
          type="text"
          name="bio"
          value={bio}
          placeholder="Enter Bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <label for="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
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
        <button onClick={() => handleSignUp()}>Sign Up</button>

        <p>
          Have an account?{' '}
          <Link to="/signIn" style={{ color: '#35BDD0' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
