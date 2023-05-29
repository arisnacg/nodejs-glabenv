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
Object.defineProperty(exports, "__esModule", { value: true });
const gitlab_1 = require("../lib/gitlab");
const utils_1 = require("../utils");
const syncEnv = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = "", repoURL = "", level, filepath = options.filepath;
        if (options.token === undefined) {
            token = (0, gitlab_1.getGitlabTokenFromEnv)();
        }
        else
            token = options.token;
        if (options.repoURL === undefined) {
            repoURL = (0, gitlab_1.getGitlabRepoFromEnv)();
        }
        else
            repoURL = options.repoURL;
        if (options.level === undefined) {
            level = (0, gitlab_1.getLevelFromEnv)();
        }
        else
            level = options.level;
        // get env file variables
        const envFileVars = (0, utils_1.parseDataFromEnv)(options.filepath);
        // get env variables from Gitlab
        const gitlabEnvVars = yield (0, gitlab_1.getGitlabEnvVars)(token, repoURL, level);
        // synchronize env file variabes to Gitlab
        const updatedEnvVars = [];
        const deletedEnvVars = [];
        const gitlabEnvVarHashmap = new Map();
        // filter updated and deleted env variabes
        gitlabEnvVars.forEach((envVar) => {
            if (envFileVars[envVar.key]) {
                if (envFileVars[envVar.key] !== envVar.value) {
                    updatedEnvVars.push({
                        key: envVar.key,
                        value: envFileVars[envVar.key],
                    });
                    delete envFileVars[envVar.key];
                }
            }
            else {
                deletedEnvVars.push({ key: envVar.key, value: envVar.value });
                delete envFileVars[envVar.key];
            }
            gitlabEnvVarHashmap.set(envVar.key, envVar.value);
        });
        // filter new env variabes
        const newEnvVars = [];
        Object.entries(envFileVars).forEach(([key, value]) => {
            if (!gitlabEnvVarHashmap.has(key)) {
                newEnvVars.push({ key, value });
            }
        });
        // console.log({ newEnvVars, updatedEnvVars, deletedEnvVars });
        if (newEnvVars.length > 0)
            yield (0, gitlab_1.createGitlabEnvVariables)(token, repoURL, level, newEnvVars);
        if (updatedEnvVars.length > 0)
            yield (0, gitlab_1.updateGitlabEnvVariables)(token, repoURL, level, updatedEnvVars);
        if (gitlab_1.deleteGitlabEnvVariables.length > 0)
            yield (0, gitlab_1.deleteGitlabEnvVariables)(token, repoURL, level, deletedEnvVars);
        const modifiedCount = newEnvVars.length + updatedEnvVars.length + deletedEnvVars.length;
        if (modifiedCount === 0)
            console.log(`Already up-to-date`);
    }
    catch (err) {
        throw err;
    }
});
exports.default = syncEnv;
//# sourceMappingURL=sync.js.map