import React, { useContext, useEffect, useState } from 'react'
import PostCategorySelector from '../Components/PostCategorySelector'
import PostInfoCard from '../Components/PostInfoCard'
import { UserContext } from '../context/context'
import { searchPublicPost } from '../context/databasefunction'

const Explore = () => {
  const { appState, dispatch } = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [numberOfPost, setNumberOfPost] = useState(0)
  const [category, setCategory] = useState('All')

  const handleSearch = () => {
    searchPublicPost({
      title,
      numberOfPost,
      category,
      dispatch,
    })
  }

  useEffect(() => {
    const numberOfPost = 20
    searchPublicPost({
      title,
      numberOfPost,
      category,
      dispatch,
    })
  }, [])
  return (
    <div className="screenContainer">
      <h1 className="heading">Explore</h1>
      <div className="searchFilterContainer">
        <div className="searchFilterInput">
          <label for="title">Post Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setNumberOfPost(0)
              setTitle(e.target.value)
            }}
          />
        </div>
        <div className="searchFilterInput">
          <label for="noOfPost">Number Of Post TO Fetch:</label>

          {title === '' ? (
            <input
              type="number"
              name="noOfPost"
              value={numberOfPost}
              onChange={(e) => setNumberOfPost(parseInt(e.target.value))}
            />
          ) : (
            <>
              <p>You cant slect with post title</p>
            </>
          )}
        </div>
        <div className="searchFilterInput">
          <label for="postCategory">Post Category:</label>
          <PostCategorySelector
            value={category}
            showAll={true}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button onClick={() => handleSearch()}>Submit</button>
      </div>
      {appState.searchPublicData ? (
        <>
          {Object.entries(appState.searchPublicData).map(([key, value]) => (
            <PostInfoCard value={value} key={key} />
          ))}
        </>
      ) : (
        <h3> No post Fetch</h3>
      )}
    </div>
  )
}

export default Explore
