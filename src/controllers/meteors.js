const neoWs = require('../services/NeoWs');

exports.getStartPage = (req, res) => {
  res.render('meteors/meteors-search', {
    pageTitle: 'Meteors Search Page',
    path: '/',
  });
};

exports.getMeteors = async (req, res, next) => {
  try {
    // console.log(req.query)
    const {
      is_potentially_hazardous_asteroid = '',
      is_counted = '',
      ...rest
    } = req.query;
    const { data } = await neoWs.getMeteors(makeQueryParams(rest));
    const filteredData = filterData(
      data.near_earth_objects,
      is_potentially_hazardous_asteroid,
      is_counted
    );
    res.status(200).render('meteors/search-result', {
      data: filteredData,
      pageTitle: 'Meteors Search Result',
      path: `/meteors/${req.query}`,
    });
  } catch (err) {
    next(err);
  }
};

const makeQueryParams = (query) => {
  const START_DATE = 'start_date';
  const END_DATE = 'end_date';
  const API_KEY = 'api_key';

  const urlSearchParams = new URLSearchParams({});

  if (query.hasOwnProperty(START_DATE)) {
    urlSearchParams.append(START_DATE, query[START_DATE]);
  }
  if (query.hasOwnProperty(END_DATE)) {
    urlSearchParams.append(END_DATE, query[END_DATE]);
  }
  if (query.hasOwnProperty(API_KEY)) {
    urlSearchParams.append(API_KEY, query[API_KEY]);
  }

  return urlSearchParams;
};

const parseItem = (el) => ({
  id: el.id,
  name: el.name,
  diameter_in_meters: el.estimated_diameter.meters,
  is_potentially_hazardous_asteroid: el.is_potentially_hazardous_asteroid,
  close_approach_date_full: el.close_approach_data[0].close_approach_date_full,
  relative_velocity: {
    kilometers_per_second:
      el.close_approach_data[0].relative_velocity.kilometers_per_second,
  },
});

const filterData = (earthObjects, hazardous, count) =>
  Object.keys(earthObjects).reduce((acc, key) => {
    const filteredData = earthObjects[key].reduce((acc, item) => {
      if (hazardous === 'true' && item.is_potentially_hazardous_asteroid) {
        acc.push(parseItem(item));
      } else if (
        hazardous === 'false' &&
        !item.is_potentially_hazardous_asteroid
      ) {
        acc.push(parseItem(item));
      } else if (!hazardous) {
        acc.push(parseItem(item));
      }
      return acc;
    }, []);

    if (filteredData.length) {
      if (count === 'true') {
        acc[key] = {
          count: filteredData.length,
          asteroids: filteredData,
        };
      } else {
        acc[key] = filteredData;
      }
    }

    return acc;
  }, {});
