'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const endpoint = require('./endpoint/endpoint');

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(endpoint);

app.get('/', (req, res) => {
    res.send("server berjalan")
})

const port = process.env.PORT
const host = process.env.HOST

app.listen(port, host, () => {
    console.log(`server up and running at http://${host}:${port}`);
})
