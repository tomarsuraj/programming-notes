import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
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
              >
                Add Post
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/searchPost"
                activeStyle={{
                  fontWeight: '900',
                  color: 'red',
                }}
              >
                Search Post
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
              >
                Bin
              </NavLink>
            </li>
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
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
