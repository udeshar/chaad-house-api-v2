const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const bluebird = require('bluebird')
require('dotenv').config();
const config = require('./config')
const routes = require('./routes')

const app = express()

mongoose.Promise = bluebird
mongoose.connect(config.mongo.url,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Mongodb connection created successfully");
});

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use('/', routes)

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`)
})

module.exports = app