import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from '../styles/Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const loggedInIcons = <>{currentUser?.username}</>
  const loggedOutIcons = <>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/signup" >
      <i className='fas fa-user-plus'></i> Sign up</NavLink>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/signin" >
      <i className='fas fa-sign-in'></i> Sign in</NavLink></>

  return (
    <Navbar className={styles.NavBar} expand="md" fixed='top'>
      <Container>
        <NavLink to="/">
          <Navbar.Brand href="home"><h5>Cat Snaps
            <i class="fa-sharp fa-solid fa-cat fa-lg"></i></h5>
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact className={styles.NavLink}
              activeClassName={styles.Active} to="/"
              href="#home">
              <i className='fas fa-home'></i> Home</NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar