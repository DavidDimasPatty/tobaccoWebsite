const express = require("express");
const cors = require("cors");
const path = require("path");
const dbm = require("./db");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config();
dbm.connect();

app.get("/api/user", function (req, res) {
  dbm.getIdUser(req.query.idUser, req.query.password).then((result) => {
    res.send(result);
  });
});

app.get("/api/getAllProducts", function (req, res) {
  dbm.getAllProduct().then((result) => {
    res.send(result);
  });
});

app.get("/api/getProduct", function (req, res) {
  dbm.getProduct(req.query.id).then((result) => {
    res.send(result);
  });
});

app.get("/api/getProductCategories", function (req,res) {
    dbm.getCategoriesProduct(req.query.idCategory).then((result)=>{
        res.send(result);
    })
})

app.get("/api/getAllProducts", function (req, res) {
  dbm.getAllProduct().then((result) => {
    res.send(result);
  });
});

app.post("/api/addUserProduct", function (req, res) {
  dbm.addUserProduct(req.body, idUser, req.body.idProduct).then((result) => {
    res.send(result);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
