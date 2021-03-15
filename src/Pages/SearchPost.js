import React, { useState, useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PostInfoCard from "../Components/PostInfoCard";
import { UserContext } from "../context/context";
import { searchUserPost } from "../context/databasefunction";

const SearchPost = () => {
  const { appState, dispatch } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [numberOfPost, setNumberOfPost] = useState(0);
  const [category, setCategory] = useState("All");

  const handleSearch = () => {
    searchUserPost({
      title,
      numberOfPost,
      category,
      dispatch,
      uid: appState.user.uid,
    });
  };

  return (
    <Container className="mt-4">
      <Container
        fluid
        className="border border-success rounded pb-2 pl-2 pr-2 mb-2"
      >
        <Row>
          <Col sm={12} md={10}>
            <Form>
              <Row>
                <Col sm={12} md={6} className="mt-2">
                  <Form.Label>Post title</Form.Label>

                  <Form.Control
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Col>

                <Col sm={12} md={3} className="mt-2">
                  <Form.Label>Number of Post (0= all)</Form.Label>

                  {title === "" ? (
                    <Form.Control
                      type="number"
                      value={numberOfPost}
                      onChange={(e) =>
                        setNumberOfPost(parseInt(e.target.value))
                      }
                    />
                  ) : (
                    <>
                      <p>You cant slect with post title</p>{" "}
                      {() => setNumberOfPost(0)}
                    </>
                  )}
                </Col>
                <Col sm={12} md={3} className="mt-2">
                  <Form.Label>Post Category</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="All"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>All</option>
                    <option>Python</option>
                    <option>Javascript</option>
                    <option>Java</option>
                    <option>C sharp</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col sm={12} md={2} className="text-center mt-2">
            <Button variant="outline-success" onClick={() => handleSearch()}>
              Fetch Post
            </Button>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        {appState.searchPostData ? (
          <>
            {Object.entries(appState.searchPostData).map(([key, value]) => (
              <PostInfoCard value={value} key={key} />
            ))}
          </>
        ) : (
          <h3> No post Fetch</h3>
        )}
      </Container>
    </Container>
  );
};

export default SearchPost;
