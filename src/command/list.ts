import { existsSync, readFileSync, readdirSync } from "fs";
import { join as joinPath } from "path";
import type { templateConfig } from "./types";

export default function list() {
    const cwd = process.cwd();
    const templatesDirectory = joinPath(cwd, "templates");
    
    const possibleTemplatesFolder = readdirSync(templatesDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    
    console.log("Templates:")
    for(let folder of possibleTemplatesFolder) {
        let fullTemplatePath = joinPath(templatesDirectory, folder);
        let configFilePath = joinPath(fullTemplatePath, "config.json");
        if(!existsSync(configFilePath)) {
            console.error("Error: Template not configured correctly, missing config.json file");
            process.exit(1);
        }
        const config: templateConfig = JSON.parse(readFileSync(configFilePath, 'utf8'))
        console.log(` * ${folder} - version ${config.version} - ${config.description}`)
    }
}