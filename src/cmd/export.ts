import {
  getGitlabRepoFromEnv,
  getGitlabTokenFromEnv,
  getGitlabEnvVars,
  getLevelFromEnv,
} from "../lib/gitlab";
import { EnvLevel, ExportOptions } from "../interfaces/index.interface";
import { writeOutputToFile } from "../utils";

const exportEnv = async (options: ExportOptions) => {
  try {
    let token = "",
      repoURL = "",
      level: EnvLevel;
    if (options.token === undefined) {
      token = getGitlabTokenFromEnv();
    } else token = options.token;
    if (options.repoURL === undefined) {
      repoURL = getGitlabRepoFromEnv();
    } else repoURL = options.repoURL;
    if (options.level === undefined) {
      level = getLevelFromEnv();
    } else level = options.level;

    const envVars = await getGitlabEnvVars(token, repoURL, level);
    // set output based on format
    let outputStr = ``;
    if (options.format === "json") {
      if (options.pretty) outputStr = JSON.stringify(envVars, null, 2);
      else outputStr = JSON.stringify(envVars);
    } else {
      envVars.forEach((envVar) => {
        outputStr += `${envVar.key}=${envVar.value}\n`;
      });
    }
    if (options.output) {
      writeOutputToFile(options.output, outputStr);
    } else console.log(outputStr);
  } catch (err) {
    throw err;
  }
};

export default exportEnv;
