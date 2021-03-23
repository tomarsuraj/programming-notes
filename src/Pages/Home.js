import React, { useContext } from 'react'
import PostInfoCard from '../Components/PostInfoCard'
import { UserContext } from '../context/context'
import Loading from './Loading'

const Home = () => {
  const { appState, dispatch } = useContext(UserContext)

  if (appState.isLoading) {
    return <Loading />
  }

  return (
    <div className="screenContainer">
      {appState.post ? (
        <>
          {Object.entries(appState.post).map(([key, value]) => (
            <PostInfoCard value={value} key={key} isBin={false} />
          ))}
        </>
      ) : (
        <h3> No post Fetch</h3>
      )}
    </div>
  )
}

export default Home
