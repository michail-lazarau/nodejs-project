"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const neoWsRequestSchema_1 = __importDefault(require("./neoWsRequestSchema"));
const marsRoverPhotosRequestSchema_1 = __importDefault(require("./marsRoverPhotosRequestSchema"));
const schemas = {
    marsRoverPhotosSchema: neoWsRequestSchema_1.default,
    neoWsSchema: marsRoverPhotosRequestSchema_1.default,
};
exports.default = schemas;
//# sourceMappingURL=index.js.map