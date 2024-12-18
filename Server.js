const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./Config/db');


const app = express();
dotenv.config();

//Database connection
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes




//port
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))