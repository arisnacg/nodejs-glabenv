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
const exportEnv = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = "", repoURL = "", level;
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
        const envVars = yield (0, gitlab_1.getGitlabEnvVars)(token, repoURL, level);
        // set output based on format
        let outputStr = ``;
        if (options.format === "json") {
            if (options.pretty)
                outputStr = JSON.stringify(envVars, null, 2);
            else
                outputStr = JSON.stringify(envVars);
        }
        else {
            envVars.forEach((envVar) => {
                outputStr += `${envVar.key}=${envVar.value}\n`;
            });
        }
        if (options.output) {
            (0, utils_1.writeOutputToFile)(options.output, outputStr);
        }
        else
            console.log(outputStr);
    }
    catch (err) {
        throw err;
    }
});
exports.default = exportEnv;
//# sourceMappingURL=export.js.map