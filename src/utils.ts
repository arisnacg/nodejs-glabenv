import fs from "fs";
import dotenv from "dotenv";

export const handleError = (err: unknown) => {
  console.log(err);
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

export const parseDataFromEnv = (filepath: string) => {
  const envString = fs.readFileSync(filepath);
  const buf = Buffer.from(envString);
  return dotenv.parse(buf);
};
