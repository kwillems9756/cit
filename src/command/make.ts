import { readFileSync, writeFileSync, mkdirSync } from "fs"
import inquirer from "inquirer"
import { join as joinPath, dirname } from "path"
import { renderFile } from "ejs"
import type { templateConfig } from "./types"
import { checkTemplate } from "./util"

function writeFileWithFolders(filename: string, contents: string) {
  mkdirSync(dirname(filename), {
    recursive: true
  })
  writeFileSync(filename, contents)
}

export default async function make(filename: string, options: {use?: string}) {
    if(!('use' in options)) {
        console.error('Error: Missing required use option')
        process.exit(1)
    }

    checkTemplate(options.use as string);
    const templatePath = joinPath(process.cwd(), "templates", options.use as string)
    const configFilePath = joinPath(templatePath, "config.json")
    const templateFilePath = joinPath(templatePath, "template.ejs")
    
    const outputPath = joinPath(process.cwd(), filename)

    const templateConfig: templateConfig = JSON.parse(readFileSync(configFilePath, 'utf8'))

    let data: {[field: string]: string | number | boolean} = {};
    for(let argumentName in templateConfig.arguments) {
        const type = templateConfig.arguments[argumentName].type;

        let promptType = "input";
        if(type == "boolean") {
            promptType = "confirm"
        } else if(type == "number") {
            promptType = "number";
        }

        const answers = await inquirer.prompt<{[key: string]: string}>([{
            type: promptType,
            name: argumentName,
            message: argumentName + ":",
            default: templateConfig.arguments.default ?? null
        }]);
        data[argumentName] = answers[argumentName];
    }
    
    const output = await renderFile(templateFilePath, data);
    writeFileWithFolders(outputPath, output);
}
