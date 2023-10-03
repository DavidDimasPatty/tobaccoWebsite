require('dotenv').config()
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

var stringcon = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PW_DB}@cluster0.hw29l.mongodb.net/tobacco`
