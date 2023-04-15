#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const export_1 = __importDefault(require("./cmd/export"));
const utils_1 = require("./utils");
const program = new commander_1.Command();
program
    .name("GLABENV")
    .description(`CLI to synchronize Gitlab environment variables`)
    .version("1.1.1");
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
program.parse();
//# sourceMappingURL=index.js.map