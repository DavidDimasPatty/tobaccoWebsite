import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCartPlus } from "react-icons/fa";
const Header = () => {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top" >
   
      <Navbar.Brand href="/" style={{"color":"white"}} className="ms-5">Tobacco</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" expand>
        <Nav className="me-auto">
        <Nav.Link href="#link" style={{"color":"white"}}>Categories</Nav.Link>
          <Nav.Link href="#link" style={{"color":"white"}}>Stores</Nav.Link>
          <Nav.Link href="#home" style={{"color":"white"}}>About Us</Nav.Link>
          <Nav.Link href="#home" style={{"color":"white"}}>Products</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets" style={{"color":"white"}}>Login</Nav.Link>
          <Nav.Link href="#deets" style={{"color":"white"}} className="me-5"><FaCartPlus/></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
