import { existsSync, readFileSync } from "fs"
import { join as joinPath } from "path"
import type { templateConfig } from "./types"
import { checkTemplate } from "./util"

export default function info(templateName: string) {
    checkTemplate(templateName)

    const infoPath = joinPath(process.cwd(), "templates", templateName, "config.json")

    const config: templateConfig = JSON.parse(readFileSync(infoPath, 'utf8'))
    console.log(`Version: ${config.version}\nUsage: cit make --use=${templateName} someFileToCreate\n\n${config.description}\n\nArguments:${
        Object.keys(config.arguments).map(key => {
            return`\n  ${key}: ${config.arguments[key].type} - ${config.arguments[key].default != undefined ? (config.arguments[key].default + " (default)") : "No default"} - ${config.arguments[key].description}`
        }).join('')
    }`);
}