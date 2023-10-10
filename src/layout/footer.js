import React from "react";
import "../assets/style/footer.css";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Column from "react-bootstrap/Col";
const Footer = () => {
  return (
    <footer >
      <center>
        <p className="mt-3">
          <strong>Tobacco</strong> by{" "}
          <a href="https://github.com/DavidDimasPatty">David Dimas Patty</a>
        </p>
        <div>Follow me on:</div>
        
        <Row xs={"auto"} className="d-flex justify-content-center mb-4">
          <Column>
            <FaInstagram onClick={()=>{window.open("https://www.instagram.com/daviddimasss/")}} />{" "}
          </Column>{" "}
          <Column>
            <FaTwitter onClick={()=>{window.open("https://twitter.com/DavidGarpit/")}} />{" "}
          </Column>{" "}
          <Column>
            <FaEnvelope onClick={()=>{window.open("https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=ddimaspatty@gmail.com&subject=Contact%20Me%20")}} />{" "}
          </Column>
        </Row>
      </center>
    </footer>
  );
};

export default Footer;
