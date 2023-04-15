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
exports.getProjectEncodedPath = exports.getGitlabHost = exports.getGitlabRepoFromEnv = exports.getGitlabTokenFromEnv = exports.gitlabPOSTRequest = exports.gitlabPUTRequest = exports.gitlabDELETERequest = exports.gitlabGETRequest = exports.getProjectByRepoURL = exports.getProjectEnvVars = exports.updateGitlabEnvVariables = exports.deleteGitlabEnvVariables = exports.createGitlabEnvVariables = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const const_1 = require("../const");
const createGitlabEnvVariables = (accessToken, repoURL, envVars) => __awaiter(void 0, void 0, void 0, function* () {
    const hostname = (0, exports.getGitlabHost)(repoURL);
    const encodedPath = (0, exports.getProjectEncodedPath)(repoURL);
    for (let i = 0; i < envVars.length; i++) {
        const { key, value } = envVars[i];
        try {
            const endpoint = `${hostname}/api/v4/projects/${encodedPath}/variables`;
            yield (0, exports.gitlabPOSTRequest)(endpoint, accessToken, { key, value });
            console.log(`${const_1.ACTION_TYPE.create}${key} - success`);
        }
        catch (err) {
            console.log(`${const_1.ACTION_TYPE.create}${key} - failed`);
        }
    }
});
exports.createGitlabEnvVariables = createGitlabEnvVariables;
const deleteGitlabEnvVariables = (accessToken, repoURL, envVars) => __awaiter(void 0, void 0, void 0, function* () {
    const hostname = (0, exports.getGitlabHost)(repoURL);
    const encodedPath = (0, exports.getProjectEncodedPath)(repoURL);
    for (let i = 0; i < envVars.length; i++) {
        const { key } = envVars[i];
        try {
            const endpoint = `${hostname}/api/v4/projects/${encodedPath}/variables/${key}`;
            yield (0, exports.gitlabDELETERequest)(endpoint, accessToken);
            console.log(`${const_1.ACTION_TYPE.delete}${key} - success`);
        }
        catch (err) {
            console.log(`${const_1.ACTION_TYPE.delete}${key} - failed`);
        }
    }
});
exports.deleteGitlabEnvVariables = deleteGitlabEnvVariables;
const updateGitlabEnvVariables = (accessToken, repoURL, envVars) => __awaiter(void 0, void 0, void 0, function* () {
    const hostname = (0, exports.getGitlabHost)(repoURL);
    const encodedPath = (0, exports.getProjectEncodedPath)(repoURL);
    for (let i = 0; i < envVars.length; i++) {
        const { key, value } = envVars[i];
        try {
            const endpoint = `${hostname}/api/v4/projects/${encodedPath}/variables/${key}`;
            yield (0, exports.gitlabPUTRequest)(endpoint, accessToken, { value });
            console.log(`${const_1.ACTION_TYPE.update}${key} - success`);
        }
        catch (err) {
            console.log(`${const_1.ACTION_TYPE.update}${key} - failed`);
        }
    }
});
exports.updateGitlabEnvVariables = updateGitlabEnvVariables;
const getProjectEnvVars = (accessToken, repoURL) => __awaiter(void 0, void 0, void 0, function* () {
    const hostname = (0, exports.getGitlabHost)(repoURL);
    const encodedPath = (0, exports.getProjectEncodedPath)(repoURL);
    const endpoint = `${hostname}/api/v4/projects/${encodedPath}/variables`;
    return yield (0, exports.gitlabGETRequest)(endpoint, accessToken);
});
exports.getProjectEnvVars = getProjectEnvVars;
const getProjectByRepoURL = (accessToken, repoURL) => __awaiter(void 0, void 0, void 0, function* () {
    const hostname = (0, exports.getGitlabHost)(repoURL);
    const encodedPath = (0, exports.getProjectEncodedPath)(repoURL);
    const endpoint = `${hostname}/api/v4/projects/${encodedPath}`;
    return yield (0, exports.gitlabGETRequest)(endpoint, accessToken);
});
exports.getProjectByRepoURL = getProjectByRepoURL;
const gitlabGETRequest = (endpoint, accessToken, params) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.gitlabGETRequest = gitlabGETRequest;
const gitlabDELETERequest = (endpoint, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.delete(endpoint, {
            headers: {
                "PRIVATE-TOKEN": accessToken,
            },
        });
        return response.data;
    }
    catch (err) {
        throw err;
    }
});
exports.gitlabDELETERequest = gitlabDELETERequest;
const gitlabPUTRequest = (endpoint, accessToken, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.put(endpoint, body, {
            headers: {
                "PRIVATE-TOKEN": accessToken,
            },
        });
        return response.data;
    }
    catch (err) {
        throw err;
    }
});
exports.gitlabPUTRequest = gitlabPUTRequest;
const gitlabPOSTRequest = (endpoint, accessToken, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(endpoint, body, {
            headers: {
                "PRIVATE-TOKEN": accessToken,
            },
        });
        return response.data;
    }
    catch (err) {
        throw err;
    }
});
exports.gitlabPOSTRequest = gitlabPOSTRequest;
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