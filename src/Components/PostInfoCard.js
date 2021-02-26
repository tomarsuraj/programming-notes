import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { SET_VIEW_POST_DATA } from "../context/action.type";
import { UserContext } from "../context/context";

const PostInfoCard = ({ value, postId }) => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const handleClick = () => {
    dispatch({ type: SET_VIEW_POST_DATA, payload: value });
    history.push("viewPost");
  };

  return (
    <Row className="mb-4">
      <Card className="w-100 ">
        <Card.Header>
          <Card.Title>{value.postTitle}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{value.postSample}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="outline-primary" onClick={() => handleClick()}>
            View
          </Button>
        </Card.Footer>
      </Card>
    </Row>
  );
};

export default PostInfoCard;
