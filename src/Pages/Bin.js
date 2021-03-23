import React, { useContext, useEffect } from 'react'
import PostInfoCard from '../Components/PostInfoCard'
import { UserContext } from '../context/context'
import { getUserBinPost } from '../context/databasefunction'

const Bin = () => {
  const { appState, dispatch } = useContext(UserContext)

  useEffect(() => {
    getUserBinPost({ uid: appState.user.uid, dispatch })
  }, [])

  return (
    <div className="screenContainer">
      <h1 className="heading">Bin</h1>

      {appState.BinPostData ? (
        <>
          {Object.entries(appState.BinPostData).map(([key, value]) => (
            <PostInfoCard value={value} key={key} isBin={true} />
          ))}
        </>
      ) : (
        <h3> No post Fetch</h3>
      )}
    </div>
  )
}

export default Bin
