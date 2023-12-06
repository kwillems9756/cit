import { existsSync, readFileSync } from "fs";
import { join as joinPath } from "path";
import { templateConfig } from "./types";

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
    let jsonConfig: any;
    try {
        jsonConfig = JSON.parse(configText);
    } catch(_) {
        console.error(`Error: Config file does not contain valid json`)
        process.exit(1)
    }

    // TODO: Validate contents
    if(typeof(jsonConfig) != "object" || Array.isArray(jsonConfig)) {
        console.error(`Error: Config for template "${template}" is not an object, but either an array or some other invalid value`)
        process.exit(1)
    }

    if(!('version' in jsonConfig)) {
        console.error(`Error: Missing version in template "${template}"`);
        process.exit(1)
    }
    if(typeof(jsonConfig.version) != "string") {
        console.error(`Error: Version field for template "${template}" is not a string, but a ${typeof(jsonConfig.version)}`)
        process.exit(1)
    }

    if(!('description' in jsonConfig)) {
        console.error(`Error: Missing description in template "${template}"`);
        process.exit(1)
    }
    if(typeof(jsonConfig.description) != "string") {
        console.error(`Error: Description field for template "${template}" is not a string, but a ${typeof(jsonConfig.version)}`)
        process.exit(1)
    }

    if(!('arguments' in jsonConfig)) {
        console.error(`Error: Missing arguments in template "${template}"`);
        process.exit(1)
    }
    if(typeof(jsonConfig.arguments) != "object" || Array.isArray(jsonConfig.arguments)) {
        console.error(`Error: Arguments field for template "${template}" is not an object, but a ${Array.isArray(jsonConfig.version) ? 'array' : typeof(jsonConfig.version)}`)
        process.exit(1)
    }

    for(let fieldName in jsonConfig.arguments) {
        let fieldValue = jsonConfig.arguments[fieldName]
        if(typeof(fieldValue) != "object" || Array.isArray(fieldValue)) {
            console.error(`Error: Argument "${fieldName}" in template "${template}" is not an object, but a ${Array.isArray(fieldValue) ? 'array' : typeof(fieldValue)}`)
        }

        if(!('type' in fieldValue)) {
            console.error(`Error: Argument "${fieldName}" in template "${template}" does not contain a type value`)
        }
        if(typeof(fieldValue.type) != "string") {
            console.error(`Error: Field "type" in argument "${fieldName}" in template "${template}" is not a string, but a ${typeof(fieldValue.type)}`)
        }

        if(!('description' in fieldValue)) {
            console.error(`Error: Argument "${fieldName}" in template "${template}" does not contain a description`)
        }
        if(typeof(fieldValue.description) != "string") {
            console.error(`Error: Field "description" in argument "${fieldName}" in template "${template}" is not a string, but a ${typeof(fieldValue.description)}`)
        }

        if('default' in fieldValue && !["string", "number", "boolean"].includes(typeof(fieldValue.default))) {
            console.error(`Error: Field "default" in argument "${fieldName}" in template "${template}" is not a string, but a ${typeof(fieldValue.default)}`)
        }
    }
}