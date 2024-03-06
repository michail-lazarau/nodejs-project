const https = require('https')

const nasaAPIToken = "uc1cuf9cfUA8oLzOOmVRrFNGEEiKYGgvVSwXKPgg"
const startDate ="2015-09-07"
const endDate = "2015-09-08"

const options = {
  protocol: "https:",
  hostname: 'api.nasa.gov',
  path: `/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${nasaAPIToken}`,
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
