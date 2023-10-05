import React from "react";
import { useState, useEffect } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import axios from "axios";
import { Card, Button, Row, Carousel } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";
import Column from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";
const DetailProduct = () => {
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState([]);
  const [dataProductCategories, setDataProductCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const devEnv = process.env.NODE_ENV != "production";
  const { REACT_APP_DEV_URL, REACT_APP_DEV_PRODUCTION } = process.env;

  useEffect(() => {
    getDataProduct();
  }, []);

  const getDataProduct = async () => {
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_DEV_PRODUCTION
        }/getProduct`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        setDataProduct(res.data);
        getDataProductCategories(res.data[0].category);
      });
  };

  const getDataProductCategories = async (idCategory) => {
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_DEV_PRODUCTION
        }/getProductCategories`,
        {
          params: {
            idCategory: idCategory,
          },
        }
      )
      .then((res) => {
        setDataProductCategories(res);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <>
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
                          height: "500px",
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
                <InputGroup style={{ width: "10%" }}>
                  <InputGroup.Text id="inputGroupPrepend">+</InputGroup.Text>
                  <Form.Control type="number" value={0} />
                </InputGroup>
              </Form.Group>
            </center>
          </Row>
          <Row className="mt-5">
            <center>
              <Button xs variant="dark">
                Add to Cart
              </Button>
            </center>
          </Row>
        </Column>
      </Row>
      <Footer />
    </>
  );
};

export default DetailProduct;
