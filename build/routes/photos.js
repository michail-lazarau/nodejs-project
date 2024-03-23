"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const photos_1 = require("../controllers/photos");
const schemaValidator_1 = __importDefault(require("../apiSchemas/request/schemaValidator"));
const router = express_1.default.Router();
router.get('/mars-rover-latest-photo-search', photos_1.getLatestMarsPhotoPage);
router.post('/mars-rover-latest-photo', (0, schemaValidator_1.default)('marsRoverPhotosSchema'), photos_1.postUserToGetLatestMarsPhoto);
exports.default = router;
//# sourceMappingURL=photos.js.map