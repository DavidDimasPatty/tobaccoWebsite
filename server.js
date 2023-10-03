const express = require('express');
const cors = require('cors');
const path = require('path');
const dbm = require('./db');
const bodyParser = require('body-parser');
const app= express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
require('dotenv').config();
dbm.connect()



const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on ${PORT}`))