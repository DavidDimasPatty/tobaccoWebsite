import React from "react";
import { useState, useEffect } from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
import { Card, Button,Spinner} from "react-bootstrap";
import { FaStar, FaArrowRight } from "react-icons/fa";
import stores from "../assets/store.png";
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
    <div>
      <Header />
      <center>
        <h1 className="mt-4">Tobacco</h1>
        <h3>
          <i>
            <q>We provide the best quality and the best price cigars!</q>
          </i>
        </h3>
      </center>

      <Row className="mt-5 ms-2 mb-2">
        <Column className="mb-4">
          <center className="mb-4">
            <h3 className="mb-5">Hot Offers!</h3>

            <Carousel data-bs-theme="dark">
              {dataHome.map((data, index) => (
                <Carousel.Item interval={2000}>
                  <Row>
                    <Column>
                      <img
                        src={data.image[0]}
                        alt={data.name}
                        style={{
                          "max-width": "500px",
                          height: "500px",
                          display: "flex",
                          margin: "0 auto",
                          "justify-content": "center",
                        }}
                      />
                      <div>{data.name}</div>
                    </Column>
                    <Column>
                      <div>{data.description}</div>
                      <div className="mt-2">
                        <h3>Price:</h3>
                      </div>
                      <div>
                        <h2>
                          <del>${data.price + 200}/pax</del> <FaArrowRight /> $
                          {data.price}/pax
                        </h2>
                      </div>
                      <Button variant="dark">Buy Now</Button>
                    </Column>
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </center>
        </Column>
        <Column>
          <center className="mb-4">
            <h2 id="store">Check out our stores!</h2>
            <div>We currently have 3 stores in diffent states</div>
            <h6>(Click store to see the map)</h6>
            <Row>
              <Column>
                <div>
                  <img
                    src={stores}
                    style={{
                      "max-width": "600px",
                      height: "300px",
                      display: "flex",
                      margin: "0 auto",
                      "justify-content": "center",
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
                      "max-width": "600px",
                      height: "300px",
                      display: "flex",
                      margin: "0 auto",
                      "justify-content": "center",
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
                      "max-width": "600px",
                      height: "300px",
                      display: "flex",
                      margin: "0 auto",
                      "justify-content": "center",
                    }}
                  />
                  <h5>Las Vegas, Nevada</h5>
                </div>
              </Column>
            </Row>
          </center>
        </Column>
      </Row>

      <center>
        <Row>
          <Column id="category">
            <center className="mb-3">
              <h2>Categories</h2>
            </center>
            <Row className="mb-2">
              <Column>
                <Card style={{ width: "31rem" }}>
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
                    <Button variant="dark">Check products</Button>
                  </Card.Body>
                </Card>
              </Column>

              <Column>
                <Card style={{ width: "31rem" }}>
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
                    <Button variant="dark">Check products</Button>
                  </Card.Body>
                </Card>
              </Column>
              <Column>
                <Card style={{ width: "31rem" }}>
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
                    <Button variant="dark">Check products</Button>
                  </Card.Body>
                </Card>
              </Column>
            </Row>
          </Column>
        </Row>
      </center>

      <Row className="mb-4 mt-4">
        <Column>
          <center>
            <h2>Words from our customers</h2>
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
                      <div>
                        <h3>
                          <i>{arr[i]}</i>
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
