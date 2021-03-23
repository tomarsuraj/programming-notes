import React, { useContext } from 'react'
import { UserContext } from '../context/context'
import parse from 'html-react-parser'

const ViewPost = () => {
  const { appState } = useContext(UserContext)
  const { viewPostData } = appState

  return (
    <div className="screenContainer">
      {viewPostData ? (
        <>
          <div>
            <h2>{viewPostData.postTitle}</h2>
          </div>
          {parse(viewPostData.postBody)}
        </>
      ) : (
        <h4>No Post Data</h4>
      )}
    </div>
  )
}

export default ViewPost
