import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from "fs";
import { join as joinPath } from "path";

function deleteFolderRecursive(directoryPath: string) {
    if(existsSync(directoryPath)) {
        readdirSync(directoryPath).forEach((file, index) => {
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
    const cwd = process.cwd();
    const templatePath = joinPath(cwd, "templates", template);
    deleteFolderRecursive(templatePath);
}