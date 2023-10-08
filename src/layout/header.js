import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCartPlus } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import Row from "react-bootstrap/Row";
import { Card, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showModal, setShowModal] = useState(false);
  const [arrTemp, setArrTemp] = useState([]);
  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const tempArr = [];
  const devEnv = process.env.NODE_ENV != "production";
  const { REACT_APP_DEV_URL, REACT_APP_DEV_PRODUCTION } = process.env;

  function setValue(ses1, qty, idx) {
    var data = JSON.parse(localStorage.getItem(`order${idx}`));
    var dataa = data[1];
    var harga = ses1.price;
    var jumlah = 0;
    if (qty == "+") {
      tempArr[idx - 1] = dataa + 1;
      arrTemp[idx - 1] = dataa + 1;
      jumlah = tempArr[idx - 1];
      document.getElementById(`qty${idx - 1}`).value = dataa + 1;
      localStorage.setItem(`order${idx}`, JSON.stringify([ses1, dataa + 1]));
    } else {
      if (dataa > 0) {
        tempArr[idx - 1] = dataa - 1;
        jumlah = tempArr[idx - 1];
        arrTemp[idx - 1] = dataa + 1;
        document.getElementById(`qty${idx - 1}`).value = dataa - 1;
        localStorage.setItem(`order${idx}`, JSON.stringify([ses1, dataa - 1]));
      }
    }
    document.getElementById(`total${idx - 1}`).innerText = `$${harga * jumlah}`;
  }

  function cancel(id) {
    document.getElementById(`card${id}`).innerHTML = "";
    localStorage.removeItem(`order${id + 1}`);
  }

  const login = async (id, password) => {
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/login`,
        {
          params: {
            id: id,
            password: password,
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", res.data[0].name);
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("halouser").style.display = "";
        setShowModal(false);
      });
  };

  function keepLogin() {
    if (
      localStorage.getItem("user") != null ||
      localStorage.getItem("user") != undefined
    ) {
      document.getElementById("loginLink").style.display = "none";
      document.getElementById("halouser").style.display = "";
    }
    else{
      document.getElementById("loginLink").style.display = "";
      document.getElementById("halouser").style.display = "none";
    }
  }

  const signUp = async (name, id, password) => {
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/login`
      )
      .then((res) => {});
  };

  function logOut() {
    localStorage.removeItem("user");
    document.getElementById("loginLink").style.display = "";
    document.getElementById("halouser").style.display = "none";
  }

  useEffect(() => {
    setArrTemp((prevArr) => {
      return [...prevArr, ...tempArr];
    });
    keepLogin();
  }, []);

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
            className="me-4 mt-1"
            id="loginLink"
          >
            Login
          </Nav.Item>

          <NavDropdown
            className="me-4 "
            title={
              <span   style={{ color: "white" }}>
                Halo, {localStorage.getItem("user")}
              </span>
            }
            id="halouser"
            style={{ color: "white" }}
          >
            <NavDropdown.Item href="#action4">My Order</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={()=>{logOut()}}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Item
            onClick={handleShow}
            style={{ color: "white" }}
            className="me-5 mt-1" 
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
              for (let i = 0; i < idx; i++) {
                var data = JSON.parse(localStorage.getItem(`order${i + 1}`));
                if (data != null) {
                  var dataProd = data[0];
                  var value = data[1];
                  tempArr.push(value);
                  arr.push(
                    <Card className="mb-3" id={`card${i}`}>
                      <center>
                        <Card.Img
                          src={dataProd.image[1]}
                          style={{ "max-width": "100px", height: "100px" }}
                        />

                        <Card.Title>{dataProd.name}</Card.Title>
                      </center>
                      <Card.Text>
                        <center>
                          <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <InputGroup style={{ width: "30%" }}>
                              <InputGroup.Text
                                id="inputGroupPrepend"
                                onClick={() => {
                                  setValue(data[0], "+", Number(i) + 1);
                                }}
                              >
                                +
                              </InputGroup.Text>
                              <Form.Control
                                id={`qty${i}`}
                                type="number"
                                min={0}
                                defaultValue={0}
                                value={value}
                                disabled
                              />
                              <InputGroup.Text
                                id="inputGroupPrepend"
                                onClick={() => {
                                  setValue(data[0], "-", Number(i) + 1);
                                }}
                              >
                                -
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <h2>
                            Total :
                            <h2 id={`total${i}`}>${dataProd.price * value}</h2>
                          </h2>
                          <Button
                            className="mb-3"
                            variant="dark"
                            onClick={() => {
                              cancel(i);
                            }}
                          >
                            Cancel
                          </Button>
                        </center>
                      </Card.Text>
                    </Card>
                  );
                }
              }
              arr.push(
                <center>
                  <Button variant="dark">Check Out</Button>
                </center>
              );
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
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID"
                autoFocus
                onChange={(e) => setId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Sign Up
          </Button>
          <Button variant="secondary" onClick={() => login(id, password)}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;
