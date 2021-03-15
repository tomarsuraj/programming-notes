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
    <Row className="mb-4">
      <Card className="w-100" border="success">
        <Card.Header>
          <Row>
            <Col xs={4} sm={2} md={1}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/notes-programming.appspot.com/o/Photo%2083X%20110.jpg?alt=media&token=8fefb1c6-fa59-4e72-b4a8-1ef9c97adadd"
                width="50"
                height="50"
                roundedCircle
              />
            </Col>
            <Col xs={6}>
              {value.authorDetails ? (
                <Card.Title>{value.authorDetails.name}</Card.Title>
              ) : null}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{value.postTitle}</Card.Title>
          <Card.Text>{value.postSample}</Card.Text>
          <Card.Text className="">
            {value.isPrivate ? 'Private' : 'Public'}
          </Card.Text>
          <Card.Text className="">Category: {value.postCategory}</Card.Text>
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
                variant="outline-primary"
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
