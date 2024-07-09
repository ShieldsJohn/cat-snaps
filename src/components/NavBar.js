import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap"
import logo from '../assets/logo.jpg'

const NavBar = () => {
  return (
    <Navbar expand="md" fixed='top'>
      <Container>
        <Navbar.Brand href="#home">Cat Snaps
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link href="#home"><i className='fas fa-home'></i> Home</Nav.Link>
            <Nav.Link><i className='fas fa-user-plus'></i> Sign up</Nav.Link>
            <Nav.Link><i className='fas fa-sign-in'></i> Sign in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar