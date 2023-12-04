import { program } from "commander";

import { name, version, description } from "../package.json";

program
    .name(name)
    .description(description)
    .version(version);

program.parse();