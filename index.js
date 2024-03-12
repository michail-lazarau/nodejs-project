require('dotenv').config({path: "./.env"})

const express = require('express')

const env = process.env
const app = express()
const neoWsRoutes = require('./routes/NeoWs')

app.use(neoWsRoutes)

const server = app.listen(parseInt(env.PORT), 'localhost', () => {
  const { address, port } = server.address();
  console.log(`Express app is running at ${env.PROTOCOL}//${address}:${port}`); // IPv6
})
