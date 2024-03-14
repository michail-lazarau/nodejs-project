const dates = require('../dates')
const neoWs = require('../services/NeoWs')

exports.getMeteors = async (req, res, next) => {
const queryParams = req.query;
const START_DATE = process.env.START_DATE


const params = new URLSearchParams({})

  queryParams.hasOwnProperty(START_DATE) && params.append(START_DATE, queryParams[START_DATE])
  queryParams.hasOwnProperty('end_date') && params.append('end_date', queryParams['end_date'])
  queryParams.hasOwnProperty(START_DATE) && params.append(START_DATE, queryParams[START_DATE])

  // const params = {
  //   start_date: dates.lastMondaySerialized(),
  //   end_date: dates.lastFridaySerialized()
  // }

  try {
    const { data } = await neoWs.getMeteors(params)
    res.status(200).json( map(data.near_earth_objects) )
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Help!', error: err})
  }
}

const map = (meteors) => {
  let filteredData = {}
  for (const meteor in meteors) {
    filteredData[meteor] = meteors[meteor].map(meteor => ({
      id: meteor.id,
      name: meteor.name,
      diameter_in_meters: meteor.estimated_diameter.meters,
      is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
      close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
      relative_velocity: meteor.close_approach_data[0].relative_velocity.kilometers_per_second
    }))
  }
  return filteredData
}
