require("dotenv").config();
var { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var stringcon = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PW_DB}@cluster0.hw29l.mongodb.net/tobacco`;
const connect = async (e) => {
  await mongoose
    .connect(stringcon)
    .then(() => {
      console.log("Database Connect");
    })
    .catch((e) => {
      console.log(e);
      console.log("Failed to connect database");
    });
};
//user table
const userScheme = new Schema({
  name: String,
  idLogin: String,
  password: String,
});
var user = mongoose.model("user", userScheme);

//product table
const productScheme = new Schema({
  name: String,
  price: Number,
  description: String,
  image: Array,
  datePosted: Date,
  category: ObjectId,
});
var product = mongoose.model("product", productScheme);

//product user table
const productUserScheme = new Schema({
  idUser: ObjectId,
  product: Array,
  price: Number,
  date: Date,
});
var productUser = mongoose.model("productUser", productUserScheme);

async function getAllProduct() {
  var arr = [];
  await product
    .find()
    .then((res) => {
      arr = res;
    })
    .catch((e) => {
      console.log(e);
    });

  return arr;
}

async function getProduct(id) {
  var arr = [];
  await product
    .find({ _id: id })
    .then((res) => {
      arr = res;
    })
    .catch((e) => {
      console.log(e);
    });
  return arr;
}

async function getCategoriesProduct(id) {
  var arr = [];
  await product
    .find({ category: id })
    .then((res) => {
      arr = res;
    })
    .catch((e) => {
      console.log(e);
    });
  return arr;
}

async function getIdUser(id, password) {
  var arr = [];
  await user
    .find({ $and: [{ idLogin: id }, { password: password }] })
    .then((res) => {
      arr = res;
    })
    .catch((e) => {
      console.log(e);
    });
  return arr;
}

async function getUserProduct(id) {
  var arr = [];
  await productUser
    .find({ idUser: id })
    .then((res) => {
      arr = res;
    })
    .catch((e) => {
      console.log(e);
    });
  return arr;
}

async function addUserProduct(idUser, product, price, date) {
  var result = "";
  const newData = {
    idUser: idUser,
    product: product,
    price: price,
    date: date,
  };
  var data = new productUser(newData);
  await data
    .save()
    .then(() => {
      result = "success";
    })
    .catch(() => {
      result = "failed";
    });
    return result;
  }

async function addUser(idUser, password, name) {
  var result = "";
  const newData = {
    idLogin: idUser,
    password: password,
    name: name,
  };
  var data = new user(newData);
  await data
    .save()
    .then(() => {
      result = "success";
    })
    .catch(() => {
      result = "failed";
    });
  return result;
}

module.exports = {
  connect: connect,
  getIdUser: getIdUser,
  getAllProduct: getAllProduct,
  addUserProduct: addUserProduct,
  getProduct: getProduct,
  getCategoriesProduct: getCategoriesProduct,
  addUser: addUser,
  getUserProduct: getUserProduct,
  addUserProduct: addUserProduct,
};
