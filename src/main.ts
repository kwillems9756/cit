import { program } from "commander";

import { name, version, description } from "../package.json";
import info from "./command/info";

program
    .name(name)
    .description(description)
    .version(version);

program
    .command('info')
    .description('Get information about a template')
    .argument('<template>')
    .action(info)

program.parse();