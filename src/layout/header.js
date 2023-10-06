import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCartPlus } from "react-icons/fa";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from "react-bootstrap/Row";
import { Card, Button, Modal, Form } from "react-bootstrap";

const Header = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);


  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top" >
   
      <Navbar.Brand href="/" style={{"color":"white"}} className="ms-5">Tobacco</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" expand>
        <Nav className="me-auto">
        <Nav.Link href="#link" style={{"color":"white"}}>Categories</Nav.Link>
          <Nav.Link href="#link" style={{"color":"white"}}>Stores</Nav.Link>
          <Nav.Link href="/aboutus" style={{"color":"white"}}>About Us</Nav.Link>
          <Nav.Link href="/product" style={{"color":"white"}}>Products</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item onClick={handleShowModal} style={{"color":"white"}} className="me-5">Login</Nav.Item>
          <Nav.Item onClick={handleShow} style={{"color":"white"}} className="me-5"><FaCartPlus/></Nav.Item>
        </Nav>
      </Navbar.Collapse>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

        <Button variant="dark">Check Out</Button>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;
