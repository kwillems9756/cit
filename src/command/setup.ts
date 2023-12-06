import { join as joinPath } from "path";
import { writeFileSync, existsSync as dirExistsSync, mkdirSync, existsSync } from "fs";

function makeTemplatesFolderIfNeeded(folder: string) {
    if(!dirExistsSync(folder)) {
        mkdirSync(folder);
    }
}

export default function setup(template: string) {
    const cwd = process.cwd();
    
    const templateRootFolder = joinPath(cwd, "templates");
    makeTemplatesFolderIfNeeded(templateRootFolder);

    const templateSubFolder = joinPath(templateRootFolder, template);
    if(existsSync(templateSubFolder)) {
        console.error(`Error: Template folder for "${template}" already exists`);
        process.exit(0);
    }
    makeTemplatesFolderIfNeeded(templateSubFolder);

    const templateFilePath = joinPath(templateSubFolder, "template.ejs");
    const placeholderText = "Place here your EJS template code";
    writeFileSync(templateFilePath, placeholderText);

    const configFilePath = joinPath(templateSubFolder, "config.json");
    const placeholderConfigText = JSON.stringify({
        description: "Some placeholder description",
        arguments: {
            isPlaceholder: {
                type: "boolean",
                default: true,
                description: "Some placeholder argument description"
            }
        },
        version: "1.0.0",
    }, null, 2);
    writeFileSync(configFilePath, placeholderConfigText);
}