import { format } from 'date-fns';

const getLastFridayDate = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const fridayOfLastWeek = 7 - 5 + dayOfWeek;
  const fridayOfCurrentWeek = dayOfWeek - 5;
  const difference = dayOfWeek <= 5 ? fridayOfLastWeek : fridayOfCurrentWeek;
  date.setDate(date.getDate() - difference);
  return date;
};

// MARK: calculates, monday before `getLastFridayDate`
const getLastMondayDate = () => {
  const date = getLastFridayDate();
  date.setDate(date.getDate() - 4);
  return date;
};

export const lastMondaySerialized = () => {
  return format(getLastMondayDate(), DATE_TEMPLATE);
};

export const lastFridaySerialized = () => {
  return format(getLastFridayDate(), DATE_TEMPLATE);
};

export const DATE_TEMPLATE = 'yyyy-MM-dd';
