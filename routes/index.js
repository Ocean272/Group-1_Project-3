const express = require("express");
const app = express();
app.use(express.json()); // Enable express to parse JSON as request body.
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());
const userRoutes = require("./user.routes");
const publicRoutes = require("./public.routes");
const loginRoutes = require('./login.routes');


app.use(userRoutes);
app.use(publicRoutes);
app.use(loginRoutes);




module.exports = app;