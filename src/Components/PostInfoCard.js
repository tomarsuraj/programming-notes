import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Card, Button, Image, Col } from 'react-bootstrap'
import { SET_EDIT_POST_DATA, SET_VIEW_POST_DATA } from '../context/action.type'
import { UserContext } from '../context/context'
import { moveTobin } from '../context/databasefunction'

const PostInfoCard = ({ value }) => {
  const { dispatch, appState } = useContext(UserContext)
  const history = useHistory()

  const handleViewClick = () => {
    dispatch({ type: SET_VIEW_POST_DATA, payload: value })
    history.push('viewPost')
  }
  const handleEditClick = () => {
    dispatch({ type: SET_EDIT_POST_DATA, payload: value })
    history.push('editPost')
  }

  console.log('value', value)

  return (
    <Row className="pt-4">
      <Card className="w-100" border="light" bg="dark" text="white">
        <Card.Header>
          <Card.Title>{value.postTitle}</Card.Title>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <Card.Text>{value.postSample}</Card.Text>
            <Card.Text>Category: {value.postCategory}</Card.Text>
            <div
              className="float-right"
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <footer className="blockquote-footer " style={{ color: '#fff' }}>
                Author:
                {value.authorDetails
                  ? ` ${value.authorDetails.name}`
                  : ' Unknown'}
              </footer>

              <Image
                src="https://firebasestorage.googleapis.com/v0/b/notes-programming.appspot.com/o/Default%20Profiole%20pic.jpg?alt=media&token=5b752049-7083-4911-8f7b-8bb0874c22d3"
                height="30px"
                width="30px"
                roundedCircle
                className="ml-2"
              />
            </div>
          </blockquote>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button
            variant="outline-primary"
            className="mr-3"
            onClick={() => handleViewClick()}
          >
            View
          </Button>
          {value.authorUid === appState.user.uid ? (
            <>
              <Button
                variant="outline-success"
                className="mr-3"
                onClick={() => handleEditClick()}
              >
                Edit
              </Button>
              <Button
                variant="outline-warning"
                className="mr-3"
                onClick={() =>
                  moveTobin({ postData: value, uid: appState.user.uid })
                }
              >
                Move to bin
              </Button>
            </>
          ) : null}
        </Card.Footer>
      </Card>
    </Row>
  )
}

export default PostInfoCard
