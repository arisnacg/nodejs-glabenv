export interface ExportOptions {
  repoURL: string;
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
