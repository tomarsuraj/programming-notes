import React, { useState, useContext } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { UserContext } from "../context/context";

const SearchPost = () => {
  const { appState, dispatch } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("All");

  const handleSearch = () => {
    // write code
  };

  return (
    <Container className="mt-4">
      <Form>
        <Row>
          <Col sm={12} md={6} className="mt-2">
            <Form.Label>Enter Post title Name to search</Form.Label>

            <Form.Control
              placeholder="First name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col sm={10} md={4} className="mt-2">
            <Form.Label>
              Select Category In which you want to serach{" "}
            </Form.Label>
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
            </Form.Control>
          </Col>
          <Col sm={2} md={2} className="text-center mt-2">
            <Button onClick={() => handleSearch()}>Fetch Post</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SearchPost;
