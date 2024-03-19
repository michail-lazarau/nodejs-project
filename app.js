require('dotenv').config({path: "./.env"})

const express = require('express')
const bodyParser = require('body-parser')
const asteroidsRoutes = require('./src/routes/asteroids')
const marsRoverPhotosRoutes = require('./src/routes/marsRoverPhotos')
const { errorHandler, notFoundHandler } = require('./ErrorHandlingMiddlewares/errorHandler');

const { PORT, PROTOCOL } = process.env
const app = express()

app.use(bodyParser.json()) // application-json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization')
  next()
})

app.use(asteroidsRoutes)

app.use(marsRoverPhotosRoutes)

app.use(notFoundHandler)

app.use(errorHandler)

const server = app.listen(parseInt(PORT), 'localhost', () => {
  const { address, port } = server.address();
  console.log(`Express app is running at ${PROTOCOL}//${address}:${port}`); // IPv6
})
