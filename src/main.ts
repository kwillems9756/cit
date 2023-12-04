import { program } from "commander";

import { name, version, description } from "../package.json";
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

program.parse();