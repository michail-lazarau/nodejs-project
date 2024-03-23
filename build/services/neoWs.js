"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeteors = void 0;
const axios_1 = __importDefault(require("axios"));
const urlBuilder_1 = require("../utilities/urlBuilder");
const environment_1 = require("../config/environment");
const getMeteors = async (searchParams) => {
    const url = (0, urlBuilder_1.buildUrl)(environment_1.environment.nasaApi.PATH_NeoWs ?? '', searchParams);
    return (0, axios_1.default)(url);
};
exports.getMeteors = getMeteors;
//# sourceMappingURL=neoWs.js.map