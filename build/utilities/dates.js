"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATE_TEMPLATE = exports.lastFridaySerialized = exports.lastMondaySerialized = void 0;
const date_fns_1 = require("date-fns");
const getLastFridayDate = () => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const fridayOfLastWeek = 7 - 5 + dayOfWeek;
    const fridayOfCurrentWeek = dayOfWeek - 5;
    const difference = dayOfWeek <= 5 ? fridayOfLastWeek : fridayOfCurrentWeek;
    date.setDate(date.getDate() - difference);
    return date;
};
const getLastMondayDate = () => {
    const date = getLastFridayDate();
    date.setDate(date.getDate() - 4);
    return date;
};
const lastMondaySerialized = () => {
    return (0, date_fns_1.format)(getLastMondayDate(), exports.DATE_TEMPLATE);
};
exports.lastMondaySerialized = lastMondaySerialized;
const lastFridaySerialized = () => {
    return (0, date_fns_1.format)(getLastFridayDate(), exports.DATE_TEMPLATE);
};
exports.lastFridaySerialized = lastFridaySerialized;
exports.DATE_TEMPLATE = 'yyyy-MM-dd';
//# sourceMappingURL=dates.js.map