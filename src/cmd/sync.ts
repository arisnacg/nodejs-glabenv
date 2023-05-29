import { EnvVar, SyncOptions } from "../interfaces/index.interface";
import {
  getGitlabRepoFromEnv,
  getGitlabTokenFromEnv,
  getGitlabEnvVars,
  updateGitlabEnvVariables,
  deleteGitlabEnvVariables,
  createGitlabEnvVariables,
} from "../lib/gitlab";
import { parseDataFromEnv } from "../utils";

const syncEnv = async (options: SyncOptions) => {
  try {
    let token = "",
      repoURL = "",
      filepath = options.filepath;
    if (options.token === undefined) {
      token = getGitlabTokenFromEnv();
    } else token = options.token;
    if (options.repoURL === undefined) {
      repoURL = getGitlabRepoFromEnv();
    } else repoURL = options.repoURL;
    // get env file variables
    const envFileVars = parseDataFromEnv(options.filepath);
    // get env variables from Gitlab
    const gitlabEnvVars = await getGitlabEnvVars(token, repoURL);
    // synchronize env file variabes to Gitlab
    const updatedEnvVars: EnvVar[] = [];
    const deletedEnvVars: EnvVar[] = [];
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
      } else {
        deletedEnvVars.push({ key: envVar.key, value: envVar.value });
        delete envFileVars[envVar.key];
      }
      gitlabEnvVarHashmap.set(envVar.key, envVar.value);
    });
    // filter new env variabes
    const newEnvVars: EnvVar[] = [];
    Object.entries(envFileVars).forEach(([key, value]) => {
      if (!gitlabEnvVarHashmap.has(key)) {
        newEnvVars.push({ key, value });
      }
    });
    // console.log({ newEnvVars, updatedEnvVars, deletedEnvVars });
    if (newEnvVars.length > 0)
      await createGitlabEnvVariables(token, repoURL, newEnvVars);
    if (updatedEnvVars.length > 0)
      await updateGitlabEnvVariables(token, repoURL, updatedEnvVars);
    if (deleteGitlabEnvVariables.length > 0)
      await deleteGitlabEnvVariables(token, repoURL, deletedEnvVars);
    const modifiedCount =
      newEnvVars.length + updatedEnvVars.length + deletedEnvVars.length;
    if (modifiedCount === 0) console.log(`Already up-to-date`);
  } catch (err) {
    throw err;
  }
};
export default syncEnv;
