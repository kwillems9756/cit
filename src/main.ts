import { program } from "commander";

import { name, version, description } from "../package.json";
import make from "./command/make";
import setup from "./command/setup";

program
    .name(name)
    .description(description)
    .version(version);

program
    .command('setup')
    .description('You can use this command to create a new template file')
    .argument('<filename>', 'The filename of the template you are creating')
    .action(setup)

program
    .command('make')
    .description('Make a new file file relative to where to command is ran using a template file')
    .option('--use <template>', 'The template to use')
    .argument('<filename>')
    .action(make)

program.parse();