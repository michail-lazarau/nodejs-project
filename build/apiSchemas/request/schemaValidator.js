"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./validators/index"));
const validateRequestSchema = (schema) => {
    const selectedSchema = index_1.default[schema];
    if (!selectedSchema) {
        throw new Error(`${schema} does not exist`);
    }
    return (req, res, next) => {
        removeEmptyQueryParams(req.query);
        const dataType = req.body ? 'body' : 'query';
        const { error } = selectedSchema.validate(req[dataType]);
        if (error) {
            return next(error);
        }
        next();
    };
};
function removeEmptyQueryParams(query) {
    Object.keys(query).forEach((key) => {
        if (query[key] === '') {
            delete query[key];
        }
    });
}
exports.default = validateRequestSchema;
//# sourceMappingURL=schemaValidator.js.map