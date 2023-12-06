import { existsSync, readFileSync, readdirSync } from "fs";
import { join as joinPath } from "path";
import type { templateConfig } from "./types";
import { checkTemplate } from "./util";

export default function list() {
    let outputMessage = "Templates:";
    const templatesDirectory = joinPath(process.cwd(), "templates");
    if(!existsSync(templatesDirectory)) {
        console.log(outputMessage);
        process.exit(0)
    }
    
    const possibleTemplatesFolder = readdirSync(templatesDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    
    for(let templateName of possibleTemplatesFolder) {
        let fullTemplatePath = joinPath(templatesDirectory, templateName);
        checkTemplate(templateName);

        let configFilePath = joinPath(fullTemplatePath, "config.json");
        const config: templateConfig = JSON.parse(readFileSync(configFilePath, 'utf8'))
        outputMessage += `\n * ${templateName} - version ${config.version} - ${config.description}`
    }
    console.log(outputMessage);
}