import React from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";
import { useState, useEffect } from "react";
import { Card, Button, Row } from "react-bootstrap";
import axios from "axios";
import Column from "react-bootstrap/Col";
import { Form, InputGroup,Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import '../assets/style/product.css'

const Product = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductTemp, setDataProductTemp] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  
  const devEnv = process.env.NODE_ENV !== "production";
  const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

  const getData = async () => {
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL
        }/getAllProducts`
      )
      .then((res) => {
        setDataProduct(res.data);
        setDataProductTemp(res.data);
        setLoading(false);
      });
  };

  async function sortArr(sc) {
    if (sc == "") {
      setDataProduct(dataProductTemp);
    } else {
      var dataProductTemp2 = [];
      for (var i = 0; i < dataProductTemp.length; i++) {
        if (dataProductTemp[i].name.toLowerCase().includes(sc.toLowerCase())) {
          console.log(dataProductTemp[i].name);
          dataProductTemp2.push(dataProductTemp[i]);
        }
      }
      setDataProduct(dataProductTemp2);
    }
  }

  async function sortByCategories(cat) {
    var dataProductTemp2 = [];
    for (var i = 0; i < dataProductTemp.length; i++) {
      if (String(dataProductTemp[i].category) == cat) {
        console.log(dataProductTemp[i].name);
        dataProductTemp2.push(dataProductTemp[i]);
      }
    }
    setDataProduct(dataProductTemp2);
  }

  if (isLoading) {
    return (
      <center>
        <Spinner animation="border" variant="secondary" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </center>
    );
  }

  return (
    <div className="bgProduct">
      <Header />
      <center className="scale-up-ver-center">
        <InputGroup
          className="mt-4"
          style={{ width: "20%", "border-radius": "10px" }}
        >
          <Form.Control
            type="text"
            onChange={(e) => sortArr(e.target.value)}
            placeholder="Find your product"
          />
          <InputGroup.Text className="scale-up-ver-center">
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
        <center className="mt-3">
          <Button
            variant="dark"
            onClick={() => {
              sortByCategories("651bc0f677b0928646c9e42b");
            }} 
          >
            Large Cigar
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              sortByCategories("651bc11377b0928646c9e42c");
            }}
            className="ms-3"
          >
            Cigarillo
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              sortByCategories("651bc12777b0928646c9e42d");
            }}
            className="ms-3"
          >
            Little Cigar
          </Button>
        </center>
        <Row>
          {dataProduct.map((data, index) => (
            <Column>
              <Card style={{ width: "31rem" }} className="mt-5 mb-5">
                <Card.Img
                  variant="top"
                  src={data.image[1]}
                  style={{
                    "max-width": "200px",
                    "max-height": "200px",
                    display: "flex",
                    margin: "0 auto",
                    "justify-content": "center",
                  }}
                  className="scale-up-ver-center"
                />
                <Card.Body>
                  <center className="scale-up-ver-center">
                    <Card.Title>{data.name}</Card.Title>
                    <Button
                      variant="dark"
                      onClick={(e) => {
                        window.location.href = "/product/" + data._id;
                      }}
                    >
                      Detail product
                    </Button>
                  </center>
                </Card.Body>
              </Card>
            </Column>
          ))}
        </Row>
      </center>

      <Footer />
    </div>
  );
};

export default Product;
