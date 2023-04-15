"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOutputToFile = exports.getHostname = exports.handleError = void 0;
const fs_1 = __importDefault(require("fs"));
const handleError = (err) => {
    if (err instanceof Error)
        console.error(`[Error] ${err.message}`);
    else
        throw err;
};
exports.handleError = handleError;
const getHostname = (url) => {
    const { protocol, hostname } = new URL(url);
    return protocol + "//" + hostname;
};
exports.getHostname = getHostname;
const writeOutputToFile = (path, data) => {
    fs_1.default.writeFileSync(path, data);
};
exports.writeOutputToFile = writeOutputToFile;
//# sourceMappingURL=utils.js.map