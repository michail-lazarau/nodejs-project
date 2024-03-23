"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeteors = void 0;
const axios_1 = __importDefault(require("axios"));
const urlBuilder_1 = require("../utilities/urlBuilder");
const PATH_NeoWs = process.env.PATH_NeoWs ?? '';
const getMeteors = async (searchParams) => {
    const url = (0, urlBuilder_1.buildUrl)(PATH_NeoWs, searchParams);
    return (0, axios_1.default)(url);
};
exports.getMeteors = getMeteors;
//# sourceMappingURL=neoWs.js.map