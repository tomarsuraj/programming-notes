import { auth } from "firebase";
import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/" className="text-white">
          Programing Notes
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to={`/addpost`}>
            Add Post
          </Nav.Link>
          <Nav.Link as={Link} to="/searchPost">
            Search Post
          </Nav.Link>

          <Nav.Link
            as={Link}
            onClick={() => {
              console.log("On click work");

              auth()
                .signOut()
                .then(() => {
                  toast("Sign Out", {
                    type: "success",
                  });
                  return <Redirect to="/signin" />;
                })
                .catch((error) => {
                  console.log("Error", error);
                  toast(error.message, {
                    type: "error",
                  });
                });
            }}
          >
            Sign Out
          </Nav.Link>

          <Nav.Link as={Link} to="/signIn">
            Sign In
          </Nav.Link>
          <Nav.Link as={Link} to="/signUp">
            Sign Up
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
