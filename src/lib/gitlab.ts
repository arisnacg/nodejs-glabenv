import axios, { AxiosError } from "axios";
import { getHostname } from "../utils";
import { GitlabEnvVar, GitlabProject } from "../interfaces/gitlab.interface";
import { EnvLevel, EnvVar } from "../interfaces/index.interface";
import { ACTION_TYPE } from "../const";

export const createGitlabEnvVariables = async (
  accessToken: string,
  repoURL: string,
  envVars: EnvVar[]
) => {
  const hostname = getGitlabHost(repoURL);
  const encodedPath = getProjectEncodedPath(repoURL);
  for (let i = 0; i < envVars.length; i++) {
    const { key, value } = envVars[i];
    try {
      const endpoint = `${hostname}/api/v4/projects/${encodedPath}/variables`;
      await gitlabPOSTRequest(endpoint, accessToken, { key, value });
      console.log(`${ACTION_TYPE.create}${key} - success`);
    } catch (err) {
      console.log(`${ACTION_TYPE.create}${key} - failed`);
    }
  }
};

export const deleteGitlabEnvVariables = async (
  accessToken: string,
  repoURL: string,
  envVars: EnvVar[]
) => {
  const hostname = getGitlabHost(repoURL);
  const encodedPath = getProjectEncodedPath(repoURL);
  for (let i = 0; i < envVars.length; i++) {
    const { key } = envVars[i];
    try {
      const endpoint = `${hostname}/api/v4/projects/${encodedPath}/variables/${key}`;
      await gitlabDELETERequest(endpoint, accessToken);
      console.log(`${ACTION_TYPE.delete}${key} - success`);
    } catch (err) {
      console.log(`${ACTION_TYPE.delete}${key} - failed`);
    }
  }
};

export const updateGitlabEnvVariables = async (
  accessToken: string,
  repoURL: string,
  envVars: EnvVar[]
) => {
  const hostname = getGitlabHost(repoURL);
  const encodedPath = getProjectEncodedPath(repoURL);
  for (let i = 0; i < envVars.length; i++) {
    const { key, value } = envVars[i];
    try {
      const endpoint = `${hostname}/api/v4/projects/${encodedPath}/variables/${key}`;
      await gitlabPUTRequest(endpoint, accessToken, { value });
      console.log(`${ACTION_TYPE.update}${key} - success`);
    } catch (err) {
      console.log(`${ACTION_TYPE.update}${key} - failed`);
    }
  }
};

const getEndpointByLevel = (
  level: EnvLevel,
  hostname: string,
  encodedPath: string
) => {
  if (level === "project") {
    return `${hostname}/api/v4/projects/${encodedPath}/variables`;
  } else if (level === "group") {
    return `${hostname}/api/v4/groups/${encodedPath}/variables`;
  } else {
    return `${hostname}/api/v4/admin/ci/variables`;
  }
};

const changeToGroupEndpoint = (hostname: string, encodedPath: string) => {
  encodedPath = encodedPath.split("%2F").slice(0, -1).join("%2F");
  return `${hostname}/api/v4/groups/${encodedPath}/variables`;
};

export const getGitlabEnvVars = async (
  accessToken: string,
  repoURL: string,
  level: EnvLevel = "project"
): Promise<GitlabEnvVar[]> => {
  const hostname = getGitlabHost(repoURL);
  const encodedPath = getProjectEncodedPath(repoURL);
  let endpoint = getEndpointByLevel(level, hostname, encodedPath);
  return await gitlabGETRequest(endpoint, accessToken);
};

export const gitlabGETRequest = async (
  endpoint: string,
  accessToken: string,
  params?: object
) => {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        "PRIVATE-TOKEN": accessToken,
      },
      params,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const gitlabDELETERequest = async (
  endpoint: string,
  accessToken: string
) => {
  try {
    const response = await axios.delete(endpoint, {
      headers: {
        "PRIVATE-TOKEN": accessToken,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const gitlabPUTRequest = async (
  endpoint: string,
  accessToken: string,
  body: object
) => {
  try {
    const response = await axios.put(endpoint, body, {
      headers: {
        "PRIVATE-TOKEN": accessToken,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const gitlabPOSTRequest = async (
  endpoint: string,
  accessToken: string,
  body: object
) => {
  try {
    const response = await axios.post(endpoint, body, {
      headers: {
        "PRIVATE-TOKEN": accessToken,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getGitlabTokenFromEnv = () => {
  const token = process.env.GLABENV_ACCESS_TOKEN;
  if (token) {
    return token;
  } else {
    throw Error(`Gitlab access token is required`);
  }
};

export const getGitlabRepoFromEnv = () => {
  const repoURL = process.env.GLABENV_REPOSITORY;
  if (repoURL) {
    return repoURL;
  } else {
    throw Error(`Gitlab repository/group/host URL is required`);
  }
};

export const getLevelFromEnv = (): EnvLevel => {
  const level = process.env.GLABENV_LEVEL;
  if (level !== undefined) {
    if (level === "project" || level === "group" || level === "instance") {
      return level;
    } else {
      throw Error(`Level only can be assigned with project | group | instance`);
    }
  }
  return `project`;
};

export const getGitlabHost = (repoURL: string) => {
  return getHostname(repoURL);
};

export const getProjectEncodedPath = (repoURL: string) => {
  let { pathname } = new URL(repoURL);
  pathname = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  return pathname.replace(/\//g, "%2F");
};
