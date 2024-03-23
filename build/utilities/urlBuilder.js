"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUrl = void 0;
const { PROTOCOL, HOSTNAME } = process.env;
const buildUrl = (path, urlSearchParams) => {
    const url = new URL(`${PROTOCOL}://${HOSTNAME}${path}`);
    url.search = urlSearchParams.toString();
    return url.toString();
};
exports.buildUrl = buildUrl;
//# sourceMappingURL=urlBuilder.js.map