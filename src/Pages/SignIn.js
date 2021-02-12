import React, { useState, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import firebase from "firebase/app";
import { toast } from "react-toastify";

// To Redirect Page
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/context";

const SignIn = () => {
  const { appData } = useContext(UserContext);

  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Sign in success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (appData.isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };
  return (
    <Container>
      <h2>Sign in</h2>
      <Form onSubmit={() => handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SignIn;
