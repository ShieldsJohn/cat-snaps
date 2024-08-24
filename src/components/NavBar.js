import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from '../styles/Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  // Visible on tablet and larger
  const addPostIcon = (
    <NavLink
      className={`${styles.NavLink} d-none d-md-block`}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className='fas fa-plus-square'></i> <span className="d-lg-inline d-none">Post</span>
    </NavLink>
  );

  // Visible only on mobile
  const addPostIconMobile = (
    <NavLink
      className={`${styles.NavLink} d-md-none`} 
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className='fas fa-plus-square'></i> <span>Post</span>
    </NavLink>
  );

  // Visible on tablet and larger
  const contactIcon = (
    <NavLink
      className={`${styles.NavLink} d-none d-md-block`}
      activeClassName={styles.Active}
      to="/contact"
    >
      <i className='fas fa-envelope'></i> <span className="d-lg-inline d-none">Contact</span>
    </NavLink>
  );

  // Visible only on mobile
  const contactIconMobile = (
    <NavLink
      className={`${styles.NavLink} d-md-none`} 
      activeClassName={styles.Active}
      to="/contact"
    >
      <i className='fas fa-envelope'></i> <span>Contact</span>
    </NavLink>
  );

  // Visible on tablet and larger
  const profileIcon = (
    <NavLink
      className={`${styles.NavLink}d-md-block`}
      to={`/profiles/${currentUser?.profile_id}`}
    >
      <Avatar src={currentUser?.profile_image} height={40} />
      <span>Profile</span>
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/feed"
      >
        <i className='fas fa-stream'></i> <span>Feed</span>
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/reactions"
      >
        <i className='far fa-grin-hearts'></i> <span>Reactions</span>
      </NavLink>

      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
      >
        <i className='fas fa-sign-out-alt'></i> <span>Sign out</span>
      </NavLink>

      {profileIcon}
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i className='fas fa-user-plus'></i> <span>Sign up</span>
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className='fas fa-sign-in'></i> <span>Sign in</span>
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

        {/* Show the addPostIcon in the navbar on tablet (md) and larger screens */}
        {currentUser && addPostIcon}

        {/* Show the contactIcon in the navbar on tablet (md) and larger screens */}
        {contactIcon}

        <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            
            {/* Show the addPostIconMobile in the navbar dropdown on mobile */}
            {currentUser && addPostIconMobile}

            {/* Show the contactIconMobile in the navbar dropdown on mobile */}
            {contactIconMobile}

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
