import React, { useState, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import firebase, { auth, firestore } from "firebase/app";
import { toast } from "react-toastify";

// To Redirect Page
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/context";

const SignUp = () => {
  const { appData } = useContext(UserContext);

  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleSignUp = () => {
    console.log("Hande Sign Up Calle");

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.log("Data", data.user.uid);

        firestore()
          .collection("Users")
          .doc(data.user.uid)
          .set({
            name,
            email,
            bio,
            uid: data.user.uid,
          })
          .then(() => {
            console.log("User added!");
          });
      })

      .catch((error) => {
        console.error(error);
      });
  };

  // if (appData.isAuthenticated) {
  //   return <Redirect to="/" />;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            type="name"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>{" "}
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            value={bio}
            type="bio"
            placeholder="Enter Bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
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

export default SignUp;
