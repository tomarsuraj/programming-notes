import { auth } from "firebase";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { CLEAR_APP_STATE } from "../context/action.type";
import { UserContext } from "../context/context";

const Header = () => {
  const { appState, dispatch } = useContext(UserContext);
  const { user } = appState;
  const { isAuthenticated } = appState;

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({ type: CLEAR_APP_STATE });
        toast("Sign Out", {
          type: "success",
        });
      })
      .catch((error) => {
        console.log("Error", error);
        toast(error.message, {
          type: "error",
        });
      });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/explore">
            Notes Programming
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/post/" + "addpost"}>
                  ADD POST
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/bin">
                  BIN
                </Link>
              </li>

              {appState.isSignIn ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signUp"
                    onClick={() => handleSignOut()}
                  >
                    SIGN OUT
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signIn">
                      Sign IN
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/signUp">
                      SIGN UP
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
