import { existsSync, readFileSync } from "fs";
import { join as joinPath } from "path";

function isJsonString(src: string): boolean {
    try {
        JSON.parse(src)
    } catch(_) {
        return false
    }
    return true
}

export function checkTemplate(template: string) {
    const templatePath = joinPath(process.cwd(), "templates", template)
    if(!existsSync(templatePath)) {
        console.error(`Template not found`)
        process.exit(1)
    }

    const configFilePath = joinPath(templatePath, "config.json")
    if(!existsSync(configFilePath)) {
        console.error(`Error: Template not configured correctly, missing config.json file`)
        process.exit(1)
    }
    const templateCodePath = joinPath(templatePath, "template.ejs")
    if(!existsSync(templateCodePath)) {
        console.error(`Error: Template not configured correctly, missing template.ejs file`)
        process.exit(1)
    }

    const configText = readFileSync(configFilePath, 'utf8');    
    if(!isJsonString(configText)) {
        console.error(`Error: Config file does not contain valid json`)
        process.exit(1)
    }

    // TODO: Validate contents
}