import React from 'react'
import PostInfoCard from '../Components/PostInfoCard'

const Bin = () => {
  return (
    <div className="screenContainer">
      <PostInfoCard isBin={true} />
      <PostInfoCard isBin={true} />
      <PostInfoCard isBin={true} />
      <PostInfoCard isBin={true} />
      <PostInfoCard isBin={true} />
    </div>
  )
}

export default Bin
