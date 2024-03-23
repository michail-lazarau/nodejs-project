"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (err, res) => {
    const errorCode = err?.response?.status || 500;
    res.status(errorCode).json({
        success: false,
        message: err?.message || 'lol, take care, drink more water',
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (res) => res.status(404).render('not-found');
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorHandler.js.map