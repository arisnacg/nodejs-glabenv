#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const utils_1 = require("./utils");
const program = new commander_1.Command();
const export_1 = __importDefault(require("./cmd/export"));
const sync_1 = __importDefault(require("./cmd/sync"));
program
    .name("GLABENV")
    .description(`CLI to synchronize Gitlab environment variables`)
    .version("1.0.2");
program
    .command("export")
    .option("-t, --token <string>", "Gitlab access token")
    .option("-r, --repoURL <url>", "repository url")
    .option("-f, --format <string>", 'output format: "env" or "json" (default env)', "env")
    .option("-o, --output <path>", "output filepath")
    .option("--pretty", "print JSON ouput in pretty format")
    .description("export gitlab repo env variables to file")
    .action((options) => {
    (0, export_1.default)(options).catch((err) => (0, utils_1.handleError)(err));
});
program
    .command("sync")
    .option("-t, --token <string>", "Gitlab access token")
    .option("-r, --repoURL <url>", "repository url")
    .requiredOption("--filepath <path>, env variables file path")
    .description("sync env variables in a file to Gitlab repository")
    .action((options) => {
    (0, sync_1.default)(options).catch((err) => (0, utils_1.handleError)(err));
});
program.parse();
//# sourceMappingURL=index.js.map