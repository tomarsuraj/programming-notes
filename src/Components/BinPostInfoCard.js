import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Button } from "react-bootstrap";
import { SET_EDIT_POST_DATA, SET_VIEW_POST_DATA } from "../context/action.type";
import { UserContext } from "../context/context";
import { deleteBinPost, getUserBinPost, restoreBinPost } from "../context/databasefunction";

const BinPostInfoCard = ({ value }) => {
  const { dispatch, appState } = useContext(UserContext);
  const history = useHistory();

  const handleViewClick = () => {
    dispatch({ type: SET_VIEW_POST_DATA, payload: value });
    history.push("viewPost");
  };

  return (
    <Row className="mb-4">
      <Card className="w-100" border="success">
        <Card.Header>
          <Card.Title>{value.postTitle}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{value.postSample}</Card.Text>
          <Card.Text className="">
            {value.isPrivate ? "Private" : "Public"}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button
            variant="outline-primary"
            className="mr-3"
            onClick={() => handleViewClick()}
          >
            View
          </Button>
          <Button
            variant="outline-primary"
            className="mr-3"
            onClick={() =>
            {
              deleteBinPost({ postId: value.id, uid: appState.user.uid })
              getUserBinPost({uid: appState.user.uid ,dispatch})
            
            }
            }
          >
            Delete
          </Button>
          <Button
            variant="outline-primary"
            className="mr-3"
            onClick={() =>{
              restoreBinPost({ postData: value, uid: appState.user.uid })
              getUserBinPost({uid: appState.user.uid ,dispatch})}
            }
          >
            Restore
          </Button>
        </Card.Footer>
      </Card>
    </Row>
  );
};

export default BinPostInfoCard;
