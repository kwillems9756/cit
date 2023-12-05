import { existsSync, readFileSync } from "fs"
import { join as joinPath } from "path"

interface templateConfig {
    version: string,
    description: string,
    arguments: {[field: string]: {
        type: "string" | "number" | "boolean",
        description: string,
        default?: string | number | boolean
    }}
}

export default function info(templateName: string) {
    const templatePath = joinPath(process.cwd(), "templates", templateName)
    if(!existsSync(templatePath)) {
        console.error('Error: Template not found')
        process.exit(1)
    }
    
    const infoPath = joinPath(templatePath, "config.json");
    if(!existsSync(infoPath)) {
        console.error('Error: Template not configured correctly, no config.json file found')
        process.exit(1)
    }

    const config: templateConfig = JSON.parse(readFileSync(infoPath, 'utf8'))
    console.log(`Version: ${config.version}\nUsage: cit make --use=${templateName} someFileToCreate\n\n${config.description}\n\nArguments:${
        Object.keys(config.arguments).map(key => {
            return`\n  ${key}: ${config.arguments[key].type} - ${config.arguments[key].default != undefined ? (config.arguments[key].default + " (default)") : "No default"} - ${config.arguments[key].description}`
        }).join('')
    }`);
}