require('dotenv').config({path: "./.env"})

const express = require('express')
const https = require('https')
const queryString = require('querystring')
const dates = require('./dates')

const env = process.env
const app = express()

const server = app.listen(parseInt(env.PORT), 'localhost', () => {
  const { address, port } = server.address();
  console.log(`Express app is running at ${env.PROTOCOL}//${address}:${port}`); // IPv6
})

const parameters = {
  start_date: dates.lastMondaySerialized(),
  end_date: dates.lastFridaySerialized(),
  api_key: env.NASA_API_KEY
}

const get_PATH_NeoWs_args = queryString.stringify(parameters)

const options = {
  protocol: env.PROTOCOL,
  hostname: env.HOSTNAME,
  path: `${env.PATH_NeoWs}?${get_PATH_NeoWs_args}`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`)
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log('\n')
    console.log(`BODY: ${JSON.stringify(chunk)}`)
  });
  res.on('end', () => {
    console.log('No more data in response.')
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`)
});

// Write data to request body
req.write('')
req.end()
