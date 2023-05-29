export type EnvLevel = "project" | "group" | "instance";
export interface ExportOptions {
  repoURL: string;
  level: EnvLevel;
  token?: string;
  format: string;
  output?: string;
  pretty: boolean;
}

export interface SyncOptions {
  repoURL: string;
  token?: string;
  filepath: string;
}

export interface ExportArg {
  repoURL?: string;
  token?: string;
}

export interface SyncArg {
  repoURL?: string;
  token?: string;
}

export interface EnvVar {
  key: string;
  value: string;
}
