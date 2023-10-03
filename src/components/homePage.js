import React from "react";
import { useState, useEffect } from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
import { Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
const HomePage = () => {
  const [dataHome, setDataHome] = useState([]);
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
        setDataHome(res.data);
        setLoading(false);
      });
  };
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div>
      <Header />
      <center>
        <h1>Tobacco</h1>
        <h2>We provide the best quality and the best price cigars!</h2>
      </center>

      <Row className="mt-5 ms-2 mb-5">
        <Column>
          <center className="mb-4">
            <h3>Some of our products!</h3>
          </center>
          <Card body>
            <Carousel data-bs-theme="dark xs">
              {dataHome.map((data, index) => (
                <Carousel.Item interval={2000}>
                  <img
                    src={data.image[0]}
                    alt={data.name}
                    style={{
                      "max-width": "100px",
                      height: "100px",
                      display: "flex",
                      margin: "0 auto",
                      "justify-content": "center",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Card>
        </Column>
        <Column>
          <center>
            <h2>Words from our Customers</h2>
            <Carousel data-bs-theme="dark xs">
              {() => {
               
              }}
              {(() => {
            var arr = [
              "The best quality services",
              "Easy to order",
              "Best innovation to ordering ciggars",
              "Fast ordered from oversea",
            ];
            const arr2 = [];
            for (var i = 0; i < arr.length; i++) {
                  arr2.push(<Carousel.Item interval={2000}>
                    <div>
                      <h3><i>{arr[i]}</i></h3>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </Carousel.Item>);
                }
            return arr2;
        })()}
            </Carousel>
          </center>
        </Column>
      </Row>

      <center>
        <Row>
          <Column>
            <center className="mb-3">
              <h2>Categories</h2>
            </center>
            <Row className="mb-2">
              <Column>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={dataHome[0].image[1]}
                    style={{
                      "max-width": "100px",
                      height: "100px",
                      display: "flex",
                      margin: "0 auto",
                      "justify-content": "center",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>Large Cigar</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Check products</Button>
                  </Card.Body>
                </Card>
              </Column>

              <Column>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={dataHome[3].image[2]}
                    style={{
                      "max-width": "100px",
                      height: "100px",
                      display: "flex",
                      margin: "0 auto",
                      "justify-content": "center",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>Cigarillo</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Check products</Button>
                  </Card.Body>
                </Card>
              </Column>
            </Row>
            <Row>
              <center>
                <Column>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={dataHome[4].image[0]}
                      style={{
                        "max-width": "100px",
                        height: "100px",
                        display: "flex",
                        margin: "0 auto",
                        "justify-content": "center",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>Little Cigar</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Check products</Button>
                    </Card.Body>
                  </Card>
                </Column>
              </center>
            </Row>
          </Column>
        </Row>
      </center>

      <Footer />
    </div>
  );
};

export default HomePage;
