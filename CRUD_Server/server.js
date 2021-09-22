const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const cors = require('cors');
const connectDB = require('./server/database/connection');
const app = express();

//Middlewares
app.use(cors());

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// connection to MongoDB Database
connectDB();

// parse request to body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});