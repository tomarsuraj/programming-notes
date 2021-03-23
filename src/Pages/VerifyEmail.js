import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import { UserContext } from '../context/context'

const VerifyEmail = () => {
  const { appState } = useContext(UserContext)

  if (appState.isEmailVerified) {
    return <Redirect to="/" />
  }
  return (
    <div className="screenContainer">
      <h2>Your Email is Not Verify</h2>
      <p>
        We Send You a email on your Email ID. First Verify Email And Then Reload
        WebSite
      </p>
    </div>
  )
}

export default VerifyEmail
