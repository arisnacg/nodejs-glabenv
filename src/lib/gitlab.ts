import axios from "axios";
import { getHostname } from "../utils";
import { GitlabEnvVar, GitlabProject } from "../interfaces/gitlab.interface";

export const getProjectEnvVars = async (
  accessToken: string,
  repoURL: string
): Promise<GitlabEnvVar[]> => {
  const hostname = getGitlabHost(repoURL);
  const encodedPath = getProjectEncodedPath(repoURL);
  const endpoint = `${hostname}/api/v4/projects/${encodedPath}/variables`;
  return await gitlabGetRequest(endpoint, accessToken);
};

export const getProjectByRepoURL = async (
  accessToken: string,
  repoURL: string
): Promise<GitlabProject> => {
  const hostname = getGitlabHost(repoURL);
  const encodedPath = getProjectEncodedPath(repoURL);
  const endpoint = `${hostname}/api/v4/projects/${encodedPath}`;
  return await gitlabGetRequest(endpoint, accessToken);
};

export const gitlabGetRequest = async (
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
    throw Error(`Gitlab repository URL is required`);
  }
};

export const getGitlabHost = (repoURL: string) => {
  return getHostname(repoURL);
};

export const getProjectEncodedPath = (repoURL: string) => {
  let { pathname } = new URL(repoURL);
  pathname = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  return pathname.replace(/\//g, "%2F");
};
