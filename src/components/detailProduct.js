import React from "react";
import { useState, useEffect } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import axios from "axios";
import { Card, Button, Row, Carousel } from "react-bootstrap";
import { Form, InputGroup,Spinner } from "react-bootstrap";
import Column from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";
import "../assets/style/detailProduct.css";
const DetailProduct = () => {
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState([]);
  const [value, setValue] = useState(0);
  const [dataProductCategories, setDataProductCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const devEnv = process.env.NODE_ENV != "production";
  const { REACT_APP_DEV_URL, REACT_APP_DEV_PRODUCTION } = process.env;

  useEffect(() => {
    getDataProductCategories();
  }, []);

  const getDataProductCategories = async () => {
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_DEV_PRODUCTION
        }/getProductCategories`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        console.log(res.data[1][0]);
        setDataProduct(res.data[0]);
        setDataProductCategories(res.data[1]);
        setIsLoading(false);
      });
  };

  function addCokies(idx,item){
    if(idx==undefined){
      idx=0;
    }
    localStorage.setItem(`index`,Number(idx)+1);
    localStorage.setItem(`order${Number(idx)+1}`,JSON.stringify(item));
  }

  if (isLoading == true) {
    return (
      <center>
        <Spinner animation="border" variant="secondary" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </center>
    );
  }

  return (
    <div className="bgDetailProduct">
      <Header />
      <Row className="ms-3 mt-5">
        <Column>
          <Card body>
            <Carousel data-bs-theme="dark">
              {(() => {
                var arr = [];
                for (var i = 0; i < dataProduct[0].image.length; i++) {
                  arr.push(
                    <Carousel.Item interval={2000}>
                      <img
                        src={dataProduct[0].image[i]}
                        style={{
                          "max-width": "500px",
                          "max-height": "500px",
                          display: "flex",
                          margin: "0 auto",
                          "justify-content": "center",
                        }}
                      />
                    </Carousel.Item>
                  );
                }
                return arr;
              })()}
            </Carousel>
          </Card>
        </Column>
        <Column>
          <Row>
            <center>
              <h2>{dataProduct[0].name}</h2>
            </center>
          </Row>
          <Row className="mt-3 me-4 ms-4">{dataProduct[0].description}</Row>
          <Row className="mt-4">
            <center>
              <Column>
                <h1>
                  <del>$ {dataProduct[0].price + 200}</del>
                  <FaArrowRight /> ${dataProduct[0].price}/pax
                </h1>
              </Column>
            </center>
          </Row>
          <Row className="mt-2">
            <center>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <InputGroup style={{ width: "15%" }}>
                  <InputGroup.Text
                    id="inputGroupPrepend"
                    onClick={() => {
                      setValue(value + 1);
                    }}
                  >
                    +
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    min={0}
                    defaultValue={0}
                    value={value}
                  />
                  <InputGroup.Text
                    id="inputGroupPrepend"
                    onClick={() => {
                      value > 0 ? setValue(value - 1) : setValue(value);
                    }}
                  >
                    -
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </center>
          </Row>
          <Row className="mt-5">
            <center>
              <Button xs variant="dark" onClick={()=>{addCokies(localStorage.getItem('index'),[dataProduct[0],value])}}>
                Add to Cart
              </Button>
            </center>
          </Row>
        </Column>
      </Row>
      <Row>
        <Row className="ms-3 mt-5">
          {" "}
          <h3>Another Products you may like:</h3>
        </Row>
        <Row className="ms-3 mt-5 mb-5">
          {(() => {
            var arr = [];
            for (var i = 0; i < dataProductCategories.length; i++) {
              arr.push(
                <Card style={{ width: "20rem" }} className="ms-4">
                  <Card.Img
                    variant="top"
                    src={dataProductCategories[i].image[1]}
                    style={{
                      "max-width": "200px",
                      height: "200px",
                      display: "flex",
                      margin: "0 auto",
                      "justify-content": "center",
                    }}
                  />
                  <Card.Body>
                    <center>
                      <h4>{dataProductCategories[i].name}</h4>
                    </center>
                  </Card.Body>
                </Card>
              );
            }
            return arr;
          })()}
        </Row>
      </Row>
      <Footer />
    </div>
  );
};

export default DetailProduct;
