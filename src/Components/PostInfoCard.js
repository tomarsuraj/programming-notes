import React from 'react'

const PostInfoCard = ({ isBin }) => {
  return (
    <div className="postInfoCardContainer">
      <h2>POst Title</h2>
      <p>
        The total width of an element should be calculated like this: Total
        element width = width + left padding + right padding + left border +
        right border + left margin + right margin The total height of an element
        should be calculated like this: Total element height = height + top
        padding + bottom padding + top border + bottom border + top margin +
        bottom margin
      </p>
      <p>Category: Python</p>
      <div className="cardFooter">
        <button>View</button>
        {isBin ? (
          <>
            <button>Restore</button>
            <button>Delete</button>
          </>
        ) : (
          <>
            <button>Edit</button>
            <button>Delete</button>
          </>
        )}

        <p>Author Name: Suraj TOmar</p>
      </div>
    </div>
  )
}

export default PostInfoCard
