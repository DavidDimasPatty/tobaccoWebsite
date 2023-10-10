import React from "react";
import { useState, useEffect } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import axios from "axios";
import { Card, Button, Row, Carousel } from "react-bootstrap";
import { Form, InputGroup, Spinner } from "react-bootstrap";
import Column from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";
const MyOrder = () => {
  const { id } = useParams();
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const devEnv = process.env.NODE_ENV != "production";
  const { REACT_APP_DEV_URL, REACT_APP_DEV_PRODUCTION } = process.env;

  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = async () => {
    await axios
      .get(
        `${
          devEnv
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_DEV_PRODUCTION
        }/getAllOrder`,
        {
          params: {
            id: id,
          },
        }
      )
      .then((res) => {
        setDataProduct(res.data);
        setIsLoading(false);
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
      <Row className="mt-4">
        <center>
          <h2>Your Orders</h2>
      <Column></Column> 
      <Column>
        {(() => {
          var arr = [];

          for (var i = 0; i < dataProduct.length; i++) {
            arr.push(
              <center>
              <Row className="mt-5  d-flex justify-content-center mb-4">
                <Card body  style={{ width: "50%" }}>
                  <div><h3>Order date :</h3> {dataProduct[i].date.substring(0,10)}</div>

                  {(() => {
                    var arr2 = [];
                    for (var j = 0; j < dataProduct[i].product.length; j++) {
                      var newJson = JSON.parse(dataProduct[i].product[j]);
                      arr2.push(
                        <Row>
                          <Column>
                            <Card style={{ width: "40%" }} className="mt-2">
                            <center>
                              <img
                                src={newJson[0].image[0]}
                                style={{ "max-height": "30%", width: "30%" }}
                              />
                              </center>
                            </Card>
                          </Column>
                          <Column>
                            <h6>{newJson[0].name}</h6>
                            <h6>Qty : {newJson[1]}</h6>
                          </Column>
                        </Row>
                      );
                    }
                    return arr2;
                  })()}

                  <div><h3>Total Price : ${dataProduct[i].price}</h3></div>
                </Card>
              </Row></center>
            );
          }

          return arr;
        })()}
        </Column> 
        </center>
      </Row>
      <Footer />
    </div>
  );
};

export default MyOrder;
