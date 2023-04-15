import {
  getGitlabRepoFromEnv,
  getGitlabTokenFromEnv,
  getProjectByRepoURL,
  getProjectEnvVars,
} from "../lib/gitlab";
import { ExportOptions } from "../interfaces/index.interface";
import { writeOutputToFile } from "../utils";

const exportEnv = async (options: ExportOptions) => {
  try {
    let token = "",
      repoURL = "";
    if (options.token === undefined) {
      token = getGitlabTokenFromEnv();
    } else token = options.token;
    if (options.repoURL === undefined) {
      repoURL = getGitlabRepoFromEnv();
    } else repoURL = options.repoURL;
    const envVars = await getProjectEnvVars(token, repoURL);
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
