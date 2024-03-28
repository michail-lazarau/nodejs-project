import * as service from '../services/neoWs';
import { Request, Response, NextFunction } from 'express';
import { Nasa, Home } from '../network/models/nasa/meteor';
import { encode } from 'node:querystring';
import path from 'path';

export const getStartPage = async (req: Request, res: Response) => {
  res.render(path.join(__dirname, '..', 'views', 'meteors/meteors-search.html'), {
    pageTitle: 'Meteors Search Page',
    path: '/',
  });
};

type QueryRest = { [key: string]: string | undefined };

export const getMeteors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { is_potentially_hazardous_asteroid = '', is_counted = '', ...rest } = req.query;
    const hazardous = is_potentially_hazardous_asteroid === 'true';
    const onlyCount = is_counted === 'true';
    const queryParams = new URLSearchParams(encode(rest as QueryRest));
    const { data } = await service.getMeteors(queryParams);
    const filteredData = filterData(data.near_earth_objects, hazardous, onlyCount);
    res.status(200).render('meteors/search-result.html', {
      data: filteredData,
      pageTitle: 'Meteors Search Result',
      path: '/meteors',
    });
  } catch (err) {
    next(err);
  }
};

const filterData = (meteorsForDates: Nasa.Response.MeteorsForTimePeriod, hazardous: boolean, onlyCount: boolean) => {
  // MARK: there's no transformation functions for dictionaries || it just hasn't been found
  return Object.entries(meteorsForDates).reduce(
    (
      accumulator: Home.Response.MeteorsForTimePeriod | Home.Response.MeteorsCountForTimePeriod,
      [key, value]: [string, Nasa.Response.Meteor[]]
    ) => {
      if (onlyCount) {
        const count = value.filter((meteor) => meteor.is_potentially_hazardous_asteroid === hazardous).length;
        accumulator[key] = { count: count };
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
