import getMeteorsPhoto from '../services/NeoWs.ts';
import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-unresolved
import { Nasa, Home } from '../network/models/nasa/meteor.js';
import { ParsedQs } from 'qs';
import { encode } from 'node:querystring';

export const getStartPage = (res: Response) => {
  res.render('meteors/meteors-search', {
    pageTitle: 'Meteors Search Page',
    path: '/',
  });
};

type QueryRest = { [key: string]: string | undefined };
type QueryComponent = string | ParsedQs | string[] | ParsedQs[] | undefined;

export const getMeteors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { is_potentially_hazardous_asteroid = '', is_counted = '', ...rest } = req.query;
    const hazardous = convertQueryComponentToBoolean(is_potentially_hazardous_asteroid);
    const onlyCount = convertQueryComponentToBoolean(is_counted);
    const { data } = await getMeteorsPhoto(makeQueryParams(rest as QueryRest));
    const filteredData = filterData(data.near_earth_objects, hazardous, onlyCount);
    res.status(200).render('meteors/search-result', {
      data: filteredData,
      pageTitle: 'Meteors Search Result',
      path: `/meteors/${req.query}`,
    });
  } catch (err) {
    next(err);
  }
};

const convertQueryComponentToBoolean = (value: QueryComponent): boolean => {
  let convertedValue: boolean = false;
  if (value === 'true') {
    convertedValue = true;
  }
  return convertedValue;
};

const makeQueryParams = (query: QueryRest) => {
  const urlQueryString = encode(query);
  return new URLSearchParams(urlQueryString);
};

const convert = (el: Nasa.Response.Meteor): Home.Response.Meteor => ({
  id: el.id,
  name: el.name,
  diameter_in_meters: el.estimated_diameter.meters,
  is_potentially_hazardous_asteroid: el.is_potentially_hazardous_asteroid,
  close_approach_date_full: el.close_approach_data[0].close_approach_date_full,
  relative_velocity: {
    kilometers_per_second: el.close_approach_data[0].relative_velocity.kilometers_per_second,
  },
});

const filterData = (meteorsForDates: Nasa.Response.MeteorsForTimePeriod, hazardous: boolean, onlyCount: boolean) => {
  // MARK: there's no transformation functions for dictionaries || it just hasn't been found
  return Object.entries(meteorsForDates).reduce(
    (
      accumulator: Home.Response.MeteorsForTimePeriod | Home.Response.MeteorsCountForTimePeriod,
      [key, value]: [string, Nasa.Response.Meteor[]]
    ) => {
      if (onlyCount) {
        accumulator[key] = value.filter((meteor) => meteor.is_potentially_hazardous_asteroid === hazardous).length;
      } else {
        accumulator[key] = value.flatMap((meteor) => {
          return meteor.is_potentially_hazardous_asteroid === hazardous ? [convert(meteor)] : [];
        });
      }

      return accumulator;
    },
    {}
  );
};
