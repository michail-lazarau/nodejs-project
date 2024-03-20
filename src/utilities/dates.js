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

const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('fr-CA', options); // 'fr-CA' gives format: 'yyyy-MM-dd'
};

exports.lastMondaySerialized = () => {
  return formatDate(getLastMondayDate());
};

exports.lastFridaySerialized = () => {
  return formatDate(getLastFridayDate());
};
