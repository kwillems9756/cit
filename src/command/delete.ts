import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from "fs";
import { join as joinPath } from "path";
import { checkTemplate } from "./util";

function deleteFolderRecursive(directoryPath: string) {
    if(existsSync(directoryPath)) {
        readdirSync(directoryPath).forEach((file) => {
            const currentPath = joinPath(directoryPath, file);
            if(lstatSync(currentPath).isDirectory()) {
                deleteFolderRecursive(currentPath);
            } else {
                unlinkSync(currentPath);
            }
        });
        rmdirSync(directoryPath);
    }
}

export default function deleteCommand(template: string) {
    checkTemplate(template)

    const templatePath = joinPath(process.cwd(), "templates", template);
    deleteFolderRecursive(templatePath);
}