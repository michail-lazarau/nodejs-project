"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./config/environment");
const express_1 = __importDefault(require("express"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const body_parser_1 = __importDefault(require("body-parser"));
const meteors_1 = __importDefault(require("./routes/meteors"));
const photos_1 = __importDefault(require("./routes/photos"));
const errorHandler_1 = require("./ErrorHandlingMiddlewares/errorHandler");
const path_1 = __importDefault(require("path"));
const { PORT } = process.env;
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.engine('html', nunjucks_1.default.render);
app.set('view engine', 'html');
console.log(__dirname);
nunjucks_1.default.configure(path_1.default.resolve(__dirname, 'views'), {
    autoescape: false,
    express: app,
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
    next();
});
app.use(meteors_1.default);
app.use(photos_1.default);
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
app.listen(parseInt(environment_1.environment.port ?? '3000'), 'localhost', () => {
    console.log(`Express app is running on port: ${environment_1.environment.port}`);
});
//# sourceMappingURL=app.js.map