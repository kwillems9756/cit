import { readFileSync, writeFileSync } from "fs"
import inquirer from "inquirer"
import { join as joinPath } from "path"
import { renderFile } from "ejs"

interface templateConfig {
    version: string,
    description: string,
    arguments: {[field: string]: {
        type: "string" | "number" | "boolean",
        description: string,
        default?: string | number | boolean
    }}
}

export default async function make(filename: string, options: {use?: string}) {
    if(!('use' in options)) {
        console.error('Error: Missing required use option')
        process.exit(1)
    }

    const templatePath = joinPath(process.cwd(), "templates", options.use as string)
    const configFilePath = joinPath(templatePath, "config.json")
    const templateFilePath = joinPath(templatePath, "template.ejs")
    
    const outputPath = joinPath(process.cwd(), filename)

    const templateConfig: templateConfig = JSON.parse(readFileSync(configFilePath, 'utf8'))

    let data: {[field: string]: string | number | boolean} = {};
    for(let argumentName in templateConfig.arguments) {
        const answers = await inquirer.prompt<{[key: string]: string}>([
            {
                name: argumentName,
                message: `${argumentName} (${templateConfig.arguments[argumentName].type}):`,
                default: templateConfig.arguments[argumentName].default ?? null
            }
        ]);
        const type = templateConfig.arguments[argumentName].type;
        switch(type) {
            case "string":
                data[argumentName] = answers[argumentName];
                break;
            case "number":
                data[argumentName] = parseFloat(answers[argumentName]);
                break;
            case "boolean":
                data[argumentName] = answers[argumentName].toLowerCase() == "true" || answers[argumentName].toLowerCase() == "yes" || answers[argumentName].toLowerCase() == "y";
                break;
        }
    }
    
    const output = await renderFile(templateFilePath, data);
    writeFileSync(outputPath, output);
}