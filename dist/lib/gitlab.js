"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectEncodedPath = exports.getGitlabHost = exports.getGitlabRepoFromEnv = exports.getGitlabTokenFromEnv = exports.gitlabGetRequest = exports.getProjectByRepoURL = exports.getProjectEnvVars = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const getProjectEnvVars = (accessToken, repoURL) => __awaiter(void 0, void 0, void 0, function* () {
    const hostname = (0, exports.getGitlabHost)(repoURL);
    const encodedPath = (0, exports.getProjectEncodedPath)(repoURL);
    const endpoint = `${hostname}/api/v4/projects/${encodedPath}/variables`;
    return yield (0, exports.gitlabGetRequest)(endpoint, accessToken);
});
exports.getProjectEnvVars = getProjectEnvVars;
const getProjectByRepoURL = (accessToken, repoURL) => __awaiter(void 0, void 0, void 0, function* () {
    const hostname = (0, exports.getGitlabHost)(repoURL);
    const encodedPath = (0, exports.getProjectEncodedPath)(repoURL);
    const endpoint = `${hostname}/api/v4/projects/${encodedPath}`;
    return yield (0, exports.gitlabGetRequest)(endpoint, accessToken);
});
exports.getProjectByRepoURL = getProjectByRepoURL;
const gitlabGetRequest = (endpoint, accessToken, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(endpoint, {
            headers: {
                "PRIVATE-TOKEN": accessToken,
            },
            params,
        });
        return response.data;
    }
    catch (err) {
        throw err;
    }
});
exports.gitlabGetRequest = gitlabGetRequest;
const getGitlabTokenFromEnv = () => {
    const token = process.env.GLABENV_ACCESS_TOKEN;
    if (token) {
        return token;
    }
    else {
        throw Error(`Gitlab access token is required`);
    }
};
exports.getGitlabTokenFromEnv = getGitlabTokenFromEnv;
const getGitlabRepoFromEnv = () => {
    const repoURL = process.env.GLABENV_REPOSITORY;
    if (repoURL) {
        return repoURL;
    }
    else {
        throw Error(`Gitlab repository URL is required`);
    }
};
exports.getGitlabRepoFromEnv = getGitlabRepoFromEnv;
const getGitlabHost = (repoURL) => {
    return (0, utils_1.getHostname)(repoURL);
};
exports.getGitlabHost = getGitlabHost;
const getProjectEncodedPath = (repoURL) => {
    let { pathname } = new URL(repoURL);
    pathname = pathname.startsWith("/") ? pathname.slice(1) : pathname;
    return pathname.replace(/\//g, "%2F");
};
exports.getProjectEncodedPath = getProjectEncodedPath;
//# sourceMappingURL=gitlab.js.map