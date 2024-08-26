import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import styles from '../styles/Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink
      className={`${styles.NavLink} d-flex align-items-center`}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className='fas fa-plus-square'></i>
      <span className="d-inline d-md-none d-lg-inline">Post</span>
    </NavLink>
  );

  const contactIcon = (
    <NavLink
      className={`${styles.NavLink} d-flex align-items-center`}
      activeClassName={styles.Active}
      to="/contact"
    >
      <i className='fas fa-envelope'></i>
      <span className="d-inline d-md-none d-lg-inline">Contact</span>
    </NavLink>
  );

  const profileIcon = (
    <NavLink
      className={`${styles.NavLink} d-flex align-items-center`}
      to={`/profiles/${currentUser?.profile_id}`}
    >
      <Avatar src={currentUser?.profile_image} height={40} />
      <span className="d-inline d-lg-inline">Profile</span>
    </NavLink>
  );

  const loggedInIcons = (
    <>
      {contactIcon}

      {addPostIcon}

      <NavLink
        className={`${styles.NavLink} d-flex align-items-center`}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className='fas fa-stream'></i>
        <span className="d-inline d-md-none d-lg-inline">Feed</span>
      </NavLink>

      <NavLink
        className={`${styles.NavLink} d-flex align-items-center`}
        activeClassName={styles.Active}
        to="/likes"
      >
        <i className='fa-regular fa-thumbs-up'></i>
        <span className="d-inline d-md-none d-lg-inline">Likes</span>
      </NavLink>

      <NavLink
        className={`${styles.NavLink} d-flex align-items-center`}
        to="/"
        onClick={handleSignOut}
      >
        <i className='fas fa-sign-out-alt'></i>
        <span className="d-inline d-md-none d-lg-inline">Sign out</span>
      </NavLink>

      {profileIcon}
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={`${styles.NavLink} d-flex align-items-center`}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className='fas fa-user-plus'></i>
        <span className="d-inline d-md-none d-lg-inline">Sign up</span>
      </NavLink>

      <NavLink
        className={`${styles.NavLink} d-flex align-items-center`}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className='fas fa-sign-in'></i>
        <span className="d-inline d-md-none d-lg-inline">Sign in</span>
      </NavLink>
    </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed='top'>
      <Container>
        <NavLink to="/">
          <Navbar.Brand href="home">
            <h5>Cat Snaps <i className="fa-sharp fa-solid fa-cat fa-lg"></i></h5>
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
