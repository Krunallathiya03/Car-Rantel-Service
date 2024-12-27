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
app.use('/auth',require("./Routes/authRoute"))
app.use('/car',require('./Routes/carRoutes'))
app.use('/booking',require('./Routes/bookingRoutes'))
app.use('/analytics',require('./Routes/analyticsRoutes'))



//port
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))