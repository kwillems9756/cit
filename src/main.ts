import { program } from "commander";

import { name, version, description } from "../package.json";
import make from "./command/make";

program
    .name(name)
    .description(description)
    .version(version);

program
    .command('make')
    .description('Make a new file file relative to where to command is ran using a template file')
    .option('--use <template>', 'The template to use')
    .argument('<filename>')
    .action(make)

program.parse();