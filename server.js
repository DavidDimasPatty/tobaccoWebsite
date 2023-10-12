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

app.get("/api/login", function (req, res) {
  dbm.getIdUser(req.query.id, req.query.password).then((result) => {
    res.send(result);
  });
});

app.get("/api/getAllProducts", function (req, res) {
  dbm.getAllProduct().then((result) => {
    res.send(result);
  });
});

app.get("/api/getProductCategories", async function (req, res) {
  await dbm.getProduct(req.query.id).then(async (ressdata) => {
    var res2 = await dbm.getCategoriesProduct(ressdata[0].category);
    res.send([ressdata, res2]);
  });
});

app.get("/api/getAllOrder", function (req, res) {
  dbm.getUserProduct(req.query.id).then((result) => {
    res.send(result);
  });
});

app.post("/api/addUserProduct", function (req, res) {
  dbm
    .addUserProduct(
      req.body.data.idUser,
      req.body.data.product,
      req.body.data.price,
      req.body.data.date
    )
    .then((result) => {
      res.send(result);
    });
});

app.post("/api/addUser", function (req, res) {
  dbm
    .addUser(req.body.data.idUser, req.body.data.password, req.body.data.name)
    .then((result) => {
      res.send(result);
    });
});

app.use(express.static(path.join(__dirname,'./build')))

app.get("*",function(_,res){
  res.sendFile(
    path.join(__dirname,'./build/index.html'),
    function(err) {
      if(err){
        res.status(500).send(err);
      }
    }
  )
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
