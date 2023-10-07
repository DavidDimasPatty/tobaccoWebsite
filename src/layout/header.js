import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCartPlus } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import { Card, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var arrTemp=[];
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  function setValue(ses1, qty, idx) {
    var data = JSON.parse(localStorage.getItem(`order${idx}`));
    console.log(data);
    var dataa = data[1];
    if (qty == "+") {
      localStorage.setItem(`order${idx}`, JSON.stringify([ses1, dataa + 1]));
      arrTemp[idx-1]=arrTemp[idx-1]+1;
    } else {
      localStorage.setItem(`order${idx}`, JSON.stringify([ses1, dataa - 1]));
      arrTemp[idx-1]=arrTemp[idx-1]-1;
    }
  }
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top">
      <Navbar.Brand href="/" style={{ color: "white" }} className="ms-5">
        Tobacco
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" expand>
        <Nav className="me-auto">
          <Nav.Link>
            <HashLink
              smooth
              to="/#category"
              style={{ color: "white", textDecoration: "none" }}
            >
              {" "}
              Categories{" "}
            </HashLink>
          </Nav.Link>
          <Nav.Link>
            <HashLink
              smooth
              to="/#store"
              style={{ color: "white", textDecoration: "none" }}
            >
              {" "}
              Stores{" "}
            </HashLink>
          </Nav.Link>
          <Nav.Link href="/aboutus" style={{ color: "white" }}>
            About Us
          </Nav.Link>
          <Nav.Link href="/product" style={{ color: "white" }}>
            Products
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item
            onClick={handleShowModal}
            style={{ color: "white" }}
            className="me-5"
          >
            Login
          </Nav.Item>
          <Nav.Item
            onClick={handleShow}
            style={{ color: "white" }}
            className="me-5"
          >
            <FaCartPlus />
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {(() => {
            var arr = [];
            var idx = localStorage.getItem("index");
            console.log(idx);
            if (idx == 0 || idx == null) {
              arr.push(<div>Nothing to checkout</div>);
            } else {
              for (var i = 0; i < idx; i++) {
                var data = JSON.parse(localStorage.getItem(`order${i + 1}`));
                var dataProd = data[0];
                var value = data[1];
                arrTemp.push(value);
                arr.push(
                  <Card className="mb-3">
                    <Card.Img src={dataProd.image[1]} />
                    <Card.Title>{dataProd.name}</Card.Title>
                    <Card.Text>
                      <center>
                        <Form.Group>
                          <Form.Label>Quantity</Form.Label>
                          <InputGroup style={{ width: "30%" }}>
                            <InputGroup.Text
                              id="inputGroupPrepend"
                              onClick={() => {
                                setValue(data[0], "+", Number(i)+1);
                              }}
                            >
                              +
                            </InputGroup.Text>
                            <Form.Control
                              type="number"
                              min={0}
                              defaultValue={0}
                              value={arrTemp[i]}
                            />
                            <InputGroup.Text
                              id="inputGroupPrepend"
                              onClick={() => {
                                setValue(data[0], "-", Number(i)+1);
                              }}
                            >
                              -
                            </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>
                        <h2>Total : {dataProd.price * value}</h2>
                      </center>
                    </Card.Text>
                  </Card>
                );
              }
              arr.push(<Button variant="dark">Check Out</Button>);
            }
            return arr;
          })()}
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
