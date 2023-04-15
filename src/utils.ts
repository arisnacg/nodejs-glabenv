import fs from "fs";

export const handleError = (err: unknown) => {
  if (err instanceof Error) console.error(`[Error] ${err.message}`);
  else throw err;
};

export const getHostname = (url: string) => {
  const { protocol, hostname } = new URL(url);
  return protocol + "//" + hostname;
};

export const writeOutputToFile = (path: string, data: string) => {
  fs.writeFileSync(path, data);
};
