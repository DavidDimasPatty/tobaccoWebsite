import React from "react";
import { useState, useEffect } from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
import { Card, Button, Spinner } from "react-bootstrap";
import { FaStar, FaArrowRight } from "react-icons/fa";
import stores from "../assets/store.png";
import "../assets/style/homepage.css";

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
    return (
      <center>
        <Spinner animation="border" variant="secondary" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </center>
    );
  }

  return (
    <div className="bgHome">
      <Header />
      <center className="scale-up-ver-center">
        <h1 className="mt-4" id="titleHomePage">
          Tobacco <hr className="underline" />
        </h1>
        <h3>
          <i>
            <q className="text">
              We provide the best quality and the best price cigars!
            </q>
          </i>
        </h3>
      </center>

      <Row
        className="mt-5 ms-2 mb-2"
        class="scale-up-ver-center"
        style={{
          "max-width": "100%",
        }}
      >
        <Column className="mb-4">
          <center class="scale-up-ver-center">
            <h3 className="mb-5">
              <div className="judul">
                Hot Offers! <hr className="underline" />
              </div>
            </h3>

            <Carousel data-bs-theme="dark">
              {dataHome.map((data, index) => (
                <Carousel.Item interval={2000}>
                  <Row>
                    <Column>
                      <img
                        src={data.image[0]}
                        alt={data.name}
                        style={{
                          "max-width": "80%",
                          height: "500px",
                          display: "flex",
                        }}
                      />
                      <div>{data.name}</div>
                    </Column>
                    <Column>
                      <div className="text">{data.description}</div>
                      <div className="mt-2">
                        <h3>Price:</h3>
                      </div>
                      <div>
                        <h2>
                          <del>${data.price + 200}/pax</del> <FaArrowRight /> $
                          {data.price}/pax
                        </h2>
                      </div>
                      <Button variant="dark" href={`/product/${data._id}`}>
                        Buy Now
                      </Button>
                    </Column>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </center>
        </Column>
        <Column
          className="mb-4"
          id="store"
          style={{
            "max-width": "100%",
          }}
        >
          <center class="scale-up-ver-center">
            <h2 className="judul">
              Check out our stores! <hr className="underline" />
            </h2>
            <div>We currently have 3 stores in diffent states</div>
            <h6>(Click store to see the map)</h6>
            <Row>
              <Column>
                <div>
                  <img
                    src={stores}
                    style={{
                      "max-width": "100%",
                      "max-height": "100%",
                    }}
                    onClick={() => {
                      window.open(
                        "https://maps.app.goo.gl/NsaDn5oytH1hVmF89",
                        "_blank"
                      );
                    }}
                  />
                  <h5>Montpelier, Vermont</h5>
                </div>
              </Column>
              <Column>
                <div>
                  <img
                    src={stores}
                    style={{
                      "max-width": "100%",
                      "max-height": "100%",
                    }}
                    onClick={() => {
                      window.open(
                        "https://maps.app.goo.gl/XvvZ9ziqzxphEtoy6",
                        "_blank"
                      );
                    }}
                  />
                  <h5>Miami, Florida</h5>
                </div>
              </Column>
              <Column>
                <div>
                  <img
                    src={stores}
                    style={{
                      "max-width": "100%",
                      "max-height": "100%",
                    }}
                    onClick={() => {
                      window.open(
                        "https://maps.app.goo.gl/P5kBLNVqZUV1Qauy8",
                        "_blank"
                      );
                    }}
                  />
                  <h5>Las Vegas, Nevada</h5>
                </div>
              </Column>
            </Row>
            <Row className="mt-4">
              <center>
                <h2 className="judul">
                  Top Seller Products
                  <hr className="underline" />
                </h2>
                <Carousel data-bs-theme="dark">
                  {(() => {
                    var arrC = [];
                    for (var i = 0; i < dataHome.length; i=i+3) {
                      arrC.push(
                        <Carousel.Item interval={2000}>
                          <Row>
                            <Column>
                              <img
                                src={dataHome[i].image[1]}
                                alt={dataHome[i].name}
                                style={{
                                  "max-width": "150px",
                                  "max-height": "150px",
                                }}
                              />
                              <h6>{dataHome[i].name}</h6>
                            </Column>
                            {(() => {
                              var arrC1 = [];
                              if (i + 1 < dataHome.length) {
                                arrC1.push(
                                  <Column>
                                    <img
                                      src={dataHome[i + 1].image[1]}
                                      style={{
                                        "max-width": "150px",
                                        "max-height": "150px",
                                      }}
                                    />
                                    <h6>{dataHome[i + 1].name}</h6>
                                  </Column>
                                );
                              }
                              return arrC1;
                            })()}
                            {(() => {
                              var arrC1 = [];
                              if (i + 2 < dataHome.length) {
                                arrC1.push(
                                <Column>
                                  <img
                                    src={dataHome[i + 2].image[1]}
                                    style={{
                                      "max-width": "150px",
                                      "max-height": "150px",
                                    }}
                                  />
                                  <h6>{dataHome[i + 2].name}</h6>
                                </Column>)
                              }
                              return arrC1;
                            })()}
                          </Row>
                        </Carousel.Item>
                      );
                    }
                    return arrC;
                  })()}
                </Carousel>
              </center>
            </Row>
          </center>
        </Column>
      </Row>

      <center className="scale-up-ver-center me-5 ms-5">
        <Row>
          <Column id="category">
            <center className="mb-3">
              <h2 className="judul">
                Categories <hr className="underline" />
              </h2>
            </center>
            <Row className="mb-2">
              <Column>
                <Card style={{ width: "auto" }}>
                  <Card.Img
                    variant="top"
                    src={dataHome[0].image[1]}
                    style={{
                      "max-width": "200px",
                      height: "200px",
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
                    <Button variant="dark" href="/product">
                      Check products
                    </Button>
                  </Card.Body>
                </Card>
              </Column>

              <Column>
                <Card style={{ width: "auto" }}>
                  <Card.Img
                    variant="top"
                    src={dataHome[3].image[2]}
                    style={{
                      "max-width": "200px",
                      height: "200px",
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
                    <Button variant="dark" href="/product">
                      Check products
                    </Button>
                  </Card.Body>
                </Card>
              </Column>
              <Column>
                <Card style={{ width: "auto" }}>
                  <Card.Img
                    variant="top"
                    src={dataHome[4].image[0]}
                    style={{
                      "max-width": "200px",
                      height: "200px",
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
                    <Button variant="dark" href="/product">
                      Check products
                    </Button>
                  </Card.Body>
                </Card>
              </Column>
            </Row>
          </Column>
        </Row>
      </center>

      <Row className="mt-5">
        <Column>
          <center class="scale-up-ver-center">
            <h2 className="judul">
              Words from our customers <hr className="underline" />
            </h2>
            <Carousel data-bs-theme="dark xs">
              {(() => {
                var arr = [
                  "The best quality services",
                  "Easy to order",
                  "Best innovation to ordering ciggars",
                  "Fast order from overseas",
                ];
                const arr2 = [];
                for (var i = 0; i < arr.length; i++) {
                  arr2.push(
                    <Carousel.Item interval={2000}>
                      <div className="mb-5">
                        <h3>
                          <i className="text">{arr[i]}</i>
                        </h3>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </Carousel.Item>
                  );
                }
                return arr2;
              })()}
            </Carousel>
          </center>
        </Column>
      </Row>

      <Footer />
    </div>
  );
};

export default HomePage;
