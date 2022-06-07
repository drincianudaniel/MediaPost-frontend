import {Link} from "react-router-dom"
import { Navbar, Container, Nav } from "react-bootstrap"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home(props){

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then(response => {
        props.handleLogout()
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  console.log(props)
    return(
        <Navbar className="header" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">MediaPost</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">My posts</Nav.Link>
            <Nav.Link href="#pricing">Upload</Nav.Link>
          </Nav>
          <Nav>
              {props.loggedInStatus === "NOT_LOGGED_IN" &&
              <Nav.Link href={"/login"}>Login</Nav.Link>}
              {props.loggedInStatus === "NOT_LOGGED_IN" &&
              <Nav.Link href={"/register"}>Register</Nav.Link>}
              {props.loggedInStatus === "LOGGED_IN" &&
              <Nav.Link href={"/profile"}>Hello {props.user.name}</Nav.Link>}
              {props.loggedInStatus === "LOGGED_IN" &&
              <Nav.Link href={"/login"} onClick={() => handleLogoutClick()}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default Home;