require('dotenv').config({path: "./.env"})

const express = require('express')
const bodyParser = require('body-parser')
const asteroidsRoutes = require('./routes/Asteroids')

const env = process.env
const app = express()

app.use(bodyParser.json()) // application-json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization')
  next()
})

app.use(asteroidsRoutes)

const server = app.listen(parseInt(env.PORT), 'localhost', () => {
  const { address, port } = server.address();
  console.log(`Express app is running at ${env.PROTOCOL}//${address}:${port}`); // IPv6
})
