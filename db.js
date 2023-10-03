require("dotenv").config();
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
  id: String,
  password: String,
});
var user = mongoose.model("user", userScheme);

//product table
const productScheme = new Schema({
  name: String,
  price: Int16Array,
  description: String,
  datePosted: Date,
});
var product = mongoose.model("product", productScheme);

//product user table
const productUserScheme = new Schema({
  idUser: ObjectID,
  idProduct: ObjectID,
});
var produtUser = mongoose.model("productUser", productUserScheme);

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

async function getIdUser(id, password) {
  var arr = [];
  await user.find({ $and: [{ _id: id }, { password: password }] }).then((res)=>{
    arr=res;
    console.log(res);
    }
  ).catch((e)=>{
    console.log(e);
  });
  return arr;
}

async function addUserProduct(idUser,idProduct){
    const newData={
        idUser:idUser,
        idProduct:idProduct
    }
    var data=new produtUser(newData);
    data.save().then(()=>{
        return "success"
    }).catch(()=>{
        return "failed"
    });
}

module.exports={
    connect:connect,
    getIdUser:getIdUser,
    getAllProduct:getAllProduct,
    addUserProduct:addUserProduct
}
