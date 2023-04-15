#! /usr/bin/env node

import { Command } from "commander";
import exportEnv from "./cmd/export";
import { handleError } from "./utils";
import { ExportOptions } from "./interfaces/gitlab.interface";
const program = new Command();

program
  .name("GLABENV")
  .description(`CLI to synchronize Gitlab environment variables`)
  .version("1.0.0");

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

program.parse();
