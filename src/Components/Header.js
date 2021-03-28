import { auth } from 'firebase'
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CLEAR_APP_STATE } from '../context/action.type'
import { UserContext } from '../context/context'

const Header = () => {
  const { appState, dispatch } = useContext(UserContext)
  const { user } = appState
  const { isAuthenticated } = appState

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch({ type: CLEAR_APP_STATE })
        toast('Sign Out', {
          type: 'success',
        })
      })
      .catch((error) => {
        console.log('Error', error)
        toast(error.message, {
          type: 'error',
        })
      })
  }
  return (
    <header className="mainHeader">
      <div className="HeaderContainer">
        <nav className="mainNav">
          <ul>
            <li>
              <NavLink
                exact
                to="/"
                activeStyle={{
                  fontWeight: '900',
                  color: 'red',
                }}
                className={!isAuthenticated ? 'disableLink' : null}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/addPost"
                activeStyle={{
                  fontWeight: '900',
                  color: 'red',
                }}
                className={!isAuthenticated ? 'disableLink' : null}
              >
                Add Post
              </NavLink>
            </li>

            <li>
              <NavLink
                exact
                to="/explore"
                activeStyle={{
                  fontWeight: '900',
                  color: 'red',
                }}
                className={!isAuthenticated ? 'disableLink' : null}
              >
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/bin"
                activeStyle={{
                  fontWeight: '900',
                  color: 'red',
                }}
                className={!isAuthenticated ? 'disableLink' : null}
              >
                Bin
              </NavLink>
            </li>
            {appState.isSignIn ? (
              <li>
                <Link to="/signUp" onClick={() => handleSignOut()}>
                  Sign Out
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    exact
                    to="/signIn"
                    activeStyle={{
                      fontWeight: '900',
                      color: 'red',
                    }}
                  >
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to="/signUp"
                    activeStyle={{
                      fontWeight: '900',
                      color: 'red',
                    }}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className="userNameHeader">
        {user.name ? <p>User Name:{user.name}</p> : null}
      </div>
    </header>
  )
}

export default Header
