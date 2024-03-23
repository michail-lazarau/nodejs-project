"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeteors = exports.getStartPage = void 0;
const service = __importStar(require("../services/neoWs"));
const node_querystring_1 = require("node:querystring");
const getStartPage = (res) => {
    res.render('meteors/meteors-search', {
        pageTitle: 'Meteors Search Page',
        path: '/',
    });
};
exports.getStartPage = getStartPage;
const getMeteors = async (req, res, next) => {
    try {
        const { is_potentially_hazardous_asteroid = '', is_counted = '', ...rest } = req.query;
        const hazardous = is_potentially_hazardous_asteroid === 'true';
        const onlyCount = is_counted === 'true';
        const queryParams = new URLSearchParams((0, node_querystring_1.encode)(rest));
        const { data } = await service.getMeteors(queryParams);
        const filteredData = filterData(data.near_earth_objects, hazardous, onlyCount);
        res.status(200).render('meteors/search-result', {
            data: filteredData,
            pageTitle: 'Meteors Search Result',
            path: `/meteors/${req.query}`,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getMeteors = getMeteors;
const filterData = (meteorsForDates, hazardous, onlyCount) => {
    return Object.entries(meteorsForDates).reduce((accumulator, [key, value]) => {
        if (onlyCount) {
            accumulator[key] = value.filter((meteor) => meteor.is_potentially_hazardous_asteroid === hazardous).length;
        }
        else {
            accumulator[key] = value.flatMap((meteor) => {
                return meteor.is_potentially_hazardous_asteroid === hazardous ? [convert(meteor)] : [];
            });
        }
        return accumulator;
    }, {});
};
const convert = (el) => ({
    id: el.id,
    name: el.name,
    diameter_in_meters: el.estimated_diameter.meters,
    is_potentially_hazardous_asteroid: el.is_potentially_hazardous_asteroid,
    close_approach_date_full: el.close_approach_data[0].close_approach_date_full,
    relative_velocity: {
        kilometers_per_second: el.close_approach_data[0].relative_velocity.kilometers_per_second,
    },
});
//# sourceMappingURL=meteors.js.map