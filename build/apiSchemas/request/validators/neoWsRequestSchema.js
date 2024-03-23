"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const neoWsSchema = joi_1.default.object({
    start_date: joi_1.default.date().less('now').iso(),
    end_date: joi_1.default.date().less('now').iso(),
    is_potentially_hazardous_asteroid: joi_1.default.boolean(),
    api_key: joi_1.default.string().alphanum().required(),
    is_counted: joi_1.default.boolean(),
});
exports.default = neoWsSchema;
//# sourceMappingURL=neoWsRequestSchema.js.map