import React from "react";
import { useState, useEffect } from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
import { Card, Button } from "react-bootstrap";
import { FaStar, FaArrowRight } from "react-icons/fa";
import image1 from "../assets/49821ce7-b62a-4bcb-9013-0a21bed58ed5.jpg";
import image2 from "../assets/futuro inteligente de metalmecanica-azul.jpg";
import image3 from "../assets/work-life-balance-working-from-home.jpg";
import "../assets/style/aboutus.css";
import image4 from "../assets/pngwing.com (1).png";
import image5 from "../assets/pngwing.com (2).png";
import image6 from "../assets/pngwing.com (3).png";
import image7 from "../assets/pngwing.com (4).png";
import image8 from "../assets/store.png";

const AboutUs = () => {
  return (
    <div className="bgAboutUs">
      <Header />
      <Row>
        <Carousel data-bs-theme="dark">
          {(() => {
            var arr = [image1, image2, image3];
            const arr2 = [];
            for (var i = 0; i < arr.length; i++) {
              arr2.push(
                <Carousel.Item interval={2000}>
                  <img class="box" src={arr[i]} height={"500rem"} />
                </Carousel.Item>
              );
            }
            return arr2;
          })()}
        </Carousel>
        <center style={{ position: "absolute", "margin-top": "5%" }}>
          <h2 className="titleAboutUs">
            About Us <hr className="underline" />
          </h2>
        </center>
      </Row>
      <Row>
        <center style={{ "margin-top": "-5%" }} className="scale-up-ver-center">
          <h2>
            <q>Market Leading in Online Tobacco Industry</q>
          </h2>
        </center>
      </Row>
      <Row>
        <center className="scale-up-ver-center">
          <h1>
            Our Awards <hr className="underline" />
          </h1>
        </center>
      </Row>
      <center className="mt-3">
        <Row>
          <Column>
            <Card style={{ width: "31rem" }}>
              <Card.Img
                variant="top"
                src={image4}
                style={{
                  "max-width": "100px",
                  height: "200px",
                  display: "flex",
                  margin: "0 auto",
                  "justify-content": "center",
                }}
                className="scale-up-ver-center"
              />
              <Card.Body>
                <Card.Title>Cigar Distributor</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Column>
          <Column>
            <Card style={{ width: "31rem" }}>
              <Card.Img
                variant="top"
                src={image5}
                style={{
                  "max-width": "200px",
                  height: "200px",
                  display: "flex",
                  margin: "0 auto",
                  "justify-content": "center",
                }}
                className="scale-up-ver-center"
              />
              <Card.Body>
                <Card.Title>Cigar Award</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Column>
          <Column>
            <Card style={{ width: "31rem" }}>
              <Card.Img
                variant="top"
                src={image6}
                style={{
                  "max-width": "150px",
                  height: "200px",
                  display: "flex",
                  margin: "0 auto",
                  "justify-content": "center",
                }}
                className="scale-up-ver-center"
              />
              <Card.Body>
                <Card.Title>Cigar Supplier</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Column>
        </Row>
      </center>
      <Row className="mt-5">
        <center>
          {" "}
          <h2 className="">
            Our Leader Greetings! <hr className="underline" />
          </h2>
        </center>
        <Column>
          <center>
            <img src={image7} className="me-5" />
          </center>
        </Column>
        <Column>
          <Row>
            <center className="scale-up-ver-center">
              <h5 className="mt-5" style={{ width: "80%" }}>
                On behalf of our entire team at Tobacco, I want to extend our
                warmest greetings and express our heartfelt gratitude for
                choosing us as your trusted partner. We consider ourselves
                fortunate to have the opportunity to serve you, and we're
                committed to delivering the highest level of quality and service
                that you deserve. Your satisfaction is our top priority, and we
                look forward to continuing to exceed your expectations. Thank
                you for your continued trust and partnership.
              </h5>
              <h2 className="mt-5">
                <i>James Doen</i>
              </h2>
            </center>
          </Row>
        </Column>
        <Column>
          <center>
            <img src={image7} className="me-5" />
          </center>
        </Column>
      </Row>

      <Row className="mb-5">
        <center>
          <h2 className="mt-5 mb-3">Our Timeline</h2>
          <div class="timeline">
            <ul>
              <li>
                <span>3rd January 2016</span>
                <div class="content">
                  <h3>Established</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                </div>
              </li>
              <li>
                <span>21st Jun 2017</span>
                <div class="content">
                  <h3>First Store</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Card style={{ background: "transparent" }}>
                    <Card.Img src={image8} />
                  </Card>
                </div>
              </li>
              <li>
                <span>15th April 2018</span>
                <div class="content">
                  <h3>Second Store</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <Card style={{ background: "transparent" }}>
                    <Card.Img src={image8} />
                  </Card>
                </div>
              </li>
              <li>
                <span>22nd March 2019</span>
                <div class="content">
                  <h3>Third Store</h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard.
                  </p>
                  <Card style={{ background: "transparent" }}>
                    <Card.Img src={image8} />
                  </Card>
                </div>
              </li>
            </ul>
          </div>
        </center>
      </Row>

      <Footer />
    </div>
  );
};

export default AboutUs;
