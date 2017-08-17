const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = require('./server/router');

mongoose.connect('mongodb://tallesfaria:7Iw71vneVUba9b5@ds149373.mlab.com:49373/lucasloja');

//App setup
app.use(morgan('combined'));
app.use(cors());
app.use(express.static(__dirname));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
