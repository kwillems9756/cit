import { program } from "commander";

import { name, version, description } from "../package.json";
import make from "./command/make";
import setup from "./command/setup";
import info from "./command/info";
import list from "./command/list";
import deleteCommand from "./command/delete";

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
    .command('delete')
    .description('With this command you can delete a template')
    .argument('<template>', 'The template to remove')
    .action(deleteCommand)

program
    .command('make')
    .description('Make a new file file relative to where to command is ran using a template file')
    .option('--use <template>', 'The template to use')
    .argument('<filename>')
    .action(make)

program
    .command('list')
    .description('With this command you can request information from a certain template such as a description or information about the arguments')
    .action(list)

program
    .command('info')
    .description('Get information about a template')
    .argument('<template>')
    .action(info)

program.parse();