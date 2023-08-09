const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

//dotenv config
dotenv.config();

//MongoDB connection
connectDB();

// rest Obj
const app = express();

// middleware
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/user', require('./routes/userRoutes'));

// static file
app.use(express.static(path.join(__dirname, './../doctor-appointment-clients/build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './doctor-appointment-clients/build/index.html'))
});

//port
const port = process.env.PORT || 8080

//listen port
app.listen(port, ()=> {
    console.log(
        `Server Running in ${process.env.NODE_MODE} Mode on ${process.env.PORT}`.bgCyan.white
        );
})