"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const meteors_1 = require("../controllers/meteors");
const schemaValidator_1 = __importDefault(require("../apiSchemas/request/schemaValidator"));
const router = express_1.default.Router();
router.get('/', meteors_1.getStartPage);
router.get('/meteors', (0, schemaValidator_1.default)('neoWsSchema'), meteors_1.getMeteors);
exports.default = router;
//# sourceMappingURL=meteors.js.map