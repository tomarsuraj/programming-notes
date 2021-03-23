import React from 'react'

const PostCategorySelector = ({ value, onChange, name, showAll }) => {
  return (
    <select name={name} value={value} onChange={onChange}>
      {showAll ? <option>All</option> : null}
      <option>Python</option>
      <option>Javascript</option>
      <option>Java</option>
      <option>C sharp</option>
    </select>
  )
}

export default PostCategorySelector
