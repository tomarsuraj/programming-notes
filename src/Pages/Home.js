import React, { useContext, useEffect } from 'react'

import { UserContext } from '../context/context'

// To Redirect Page
import { Redirect } from 'react-router-dom'
import { getUserPost } from '../context/databasefunction'
import { Button, Container, Row } from 'react-bootstrap'
import PostInfoCard from '../Components/PostInfoCard'

const Home = () => {
  const { appState, dispatch } = useContext(UserContext)

  if (!appState.isAuthenticated) {
    return <Redirect to="/signIn" />
  }

  return (
    <Container>
      {appState.post ? (
        <>
          {Object.entries(appState.post).map(([key, value]) => (
            <PostInfoCard value={value} key={key} />
          ))}
        </>
      ) : (
        <h3> No post Fetch</h3>
      )}
    </Container>
  )
}

export default Home
