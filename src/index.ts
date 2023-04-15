#! /usr/bin/env node

import { Command } from "commander";
import { handleError } from "./utils";
import { ExportOptions, SyncOptions } from "./interfaces/index.interface";
const program = new Command();
import exportEnv from "./cmd/export";
import syncEnv from "./cmd/sync";

program
  .name("GLABENV")
  .description(`CLI to synchronize Gitlab environment variables`)
  .version("1.1.0");

program
  .command("export")
  .option("-t, --token <string>", "Gitlab access token")
  .option("-r, --repoURL <url>", "repository url")
  .option(
    "-f, --format <string>",
    'output format: "env" or "json" (default env)',
    "env"
  )
  .option("-o, --output <path>", "output filepath")
  .option("--pretty", "print JSON ouput in pretty format")
  .description("export gitlab repo env variables to file")
  .action((options: ExportOptions) => {
    exportEnv(options).catch((err) => handleError(err));
  });

program
  .command("sync")
  .option("-t, --token <string>", "Gitlab access token")
  .option("-r, --repoURL <url>", "repository url")
  .requiredOption("--filepath <path>, env variables file path")
  .description("sync env variables in a file to Gitlab repository")
  .action((options: SyncOptions) => {
    syncEnv(options).catch((err) => handleError(err));
  });

program.parse();
