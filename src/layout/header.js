import { React, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaCartPlus } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import Row from "react-bootstrap/Row";
import { Card, Button, Modal, Form, InputGroup, Toast } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import "../assets/style/header.css";

const Header = () => {
  //modal offset variabel
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalSignUp, setShowModalSignUp] = useState(false);
  const [showModalToast, setShowModalToast] = useState(false);
  //offset item
  const [arrTemp, setArrTemp] = useState([]);
  const tempArr = [];
  //toast

  //login
  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  //signup
  const [idSU, setIdSU] = useState("");
  const [nameSU, setNameSU] = useState("");
  const [passwordSU, setPasswordSU] = useState("");
  const [password, setPassword] = useState("");

  //handle modal and offset
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseModalSignUp = () => setShowModalSignUp(false);
  const handleShowModalSignUp = () => setShowModalSignUp(true);
  const handleCloseModalToast = () => setShowModalToast(false);
  const handleShowModalToast = () => setShowModalToast(true);

  //env
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
        localStorage.setItem("idUser", res.data[0]._id);
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
    } else {
      document.getElementById("loginLink").style.display = "";
      document.getElementById("halouser").style.display = "none";
    }
  }

  const signUp = async () => {
    await axios
      .post(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/addUser`,
        {
          data: {
            idUser: idSU,
            password: passwordSU,
            name: nameSU,
          },
        }
      )
      .then((res) => {
        if (res.data == "success") {
          handleCloseModalSignUp();
          handleShowModalToast();
          countDown();
        } else {
        }
      });
  };

  const addUserProduct = async () => {
    var price = 0;
    var product = [];
    var idx = localStorage.getItem("index");

    for (var i = 0; i < idx; i++) {
      var data = JSON.parse(localStorage.getItem(`order${i + 1}`));
      if (data != null) {
        product.push(JSON.stringify(data));
        price += Number(data[0].price * data[1]);
      }
    }

    await axios
      .post(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/addUserProduct`,
        {
          data: {
            idUser: localStorage.getItem("idUser"),
            product: product,
            price: price,
            date: Date.now(),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data == "success") {
          for (var i = 0; i < idx; i++) {
            if (data != null) {
              localStorage.removeItem(`order${i + 1}`);
            }
          }
          localStorage.removeItem("index");
          handleClose();
        } else {
        }
      });
  };

  function logOut() {
    localStorage.removeItem("user");
    document.getElementById("loginLink").style.display = "";
    document.getElementById("halouser").style.display = "none";
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const countDown = async () => {
    var batas = 1;
    for (var i = batas; i >= 0; i--) {
      await delay(1000);
    }
    handleCloseModalToast();
  };

  useEffect(() => {
    setArrTemp((prevArr) => {
      return [...prevArr, ...tempArr];
    });
    keepLogin();
  }, []);

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top" className="allItem">
      <Navbar.Brand href="/" style={{ color: "white" }} className="ms-5">
        Tobacco
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" expand>
        <Nav className="me-auto">
          <Nav.Link className="navMenu">
            <HashLink
              smooth
              to="/#category"
              style={{ color: "white", textDecoration: "none" }}
            >
              Categories
            </HashLink>
          </Nav.Link>
          <Nav.Link className="navMenu">
            <HashLink
              smooth
              to="/#store"
              style={{ color: "white", textDecoration: "none" }}
            >
              Stores
            </HashLink>
          </Nav.Link>
          <Nav.Link
            href="/aboutus"
            style={{ color: "white" }}
            className="navMenu"
          >
            About Us
          </Nav.Link>
          <Nav.Link
            href="/product"
            style={{ color: "white" }}
            className="navMenu"
          >
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
              <span style={{ color: "white" }}>
                Halo, {localStorage.getItem("user")}
              </span>
            }
            id="halouser"
            style={{ color: "white" }}
          >
            <NavDropdown.Item
              href={`/myorder/${localStorage.getItem("idUser")}`}
            >
              My Order
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => {
                logOut();
              }}
            >
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
        <Offcanvas.Body id="canvas">
          {(() => {
            var arr = [];
            var idx = localStorage.getItem("index");
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
                  <Button
                    variant="dark"
                    onClick={() => {
                      addUserProduct();
                    }}
                  >
                    Check Out
                  </Button>
                </center>
              );
            }
            return arr;
          })()}
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
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
          <Button
            variant="secondary"
            onClick={() => {
              handleShowModalSignUp();
              handleCloseModal();
            }}
          >
            Sign Up
          </Button>
          <Button variant="secondary" onClick={() => login(id, password)}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalSignUp} onHide={handleCloseModalSignUp}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Account ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID"
                autoFocus
                onChange={(e) => setIdSU(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPasswordSU(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setNameSU(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              signUp();
            }}
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="sm"
        show={showModalToast}
        onHide={() => handleCloseModalToast()}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            <center>Succes Sign Up</center>
          </Modal.Title>
        </Modal.Header>
      </Modal>
    </Navbar>
  );
};

export default Header;
