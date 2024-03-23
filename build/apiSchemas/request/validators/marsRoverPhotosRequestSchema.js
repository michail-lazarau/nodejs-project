"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marsRoverPhotos = void 0;
const joi_1 = __importDefault(require("joi"));
exports.marsRoverPhotos = joi_1.default.object({
    userId: joi_1.default.alternatives([joi_1.default.string(), joi_1.default.number()]).required(),
    userName: joi_1.default.string().required(),
    api_key: joi_1.default.string().alphanum().required(),
});
exports.default = exports.marsRoverPhotos;
//# sourceMappingURL=marsRoverPhotosRequestSchema.js.map