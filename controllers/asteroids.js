const dates = require('../dates')
const neoWs = require('../NasaService/NeoWs')



exports.getAsteroids = async (req, res, next) => {

  const params = {
    start_date: dates.lastMondaySerialized(),
    end_date: dates.lastFridaySerialized()
  }

  try {
    const { data } = await neoWs.getAsteroids(params)
    res.status(200).json({ data })
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Help!', error: err})
  }
}

// const axios = require('axios')
// const urlBuilder = require('../urlBuilder')
// const env = process.env

// exports.getAsteroids = async (req, res, next) => {
//
//   const params = {
//     start_date: dates.lastMondaySerialized(),
//     end_date: dates.lastFridaySerialized()
//   }
//
//   const url = urlBuilder.make(env.PATH_NeoWs, params)
//
//   try {
//     const {data} = await axios.get(url);
//     res.status(200).json({ data })
//   } catch(err) {
//     console.log(err)
//     res.status(500).json({message: 'Help!', error: err})
//   }
// }
