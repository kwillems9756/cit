import { join as joinPath } from "path";
import { writeFileSync, existsSync as dirExistsSync, mkdirSync } from "fs";

function makeTemplatesFolderIfNeeded(folder: string) {
    if(!dirExistsSync(folder)) {
        mkdirSync(folder);
    }
}

export default function setup(filename: string) {
    const cwd = process.cwd();
    
    const templateRootFolder = joinPath(cwd, "templates");
    makeTemplatesFolderIfNeeded(templateRootFolder);

    // TODO: Allow extension to be added to filename
    const templateFilePath = joinPath(templateRootFolder, filename + ".ejs");
    const placeholderText = "Place here your EJS template code";

    writeFileSync(templateFilePath, placeholderText);
}