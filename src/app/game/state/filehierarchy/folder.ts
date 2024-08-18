import { File } from './file';

export class Folder {
    folderName: string;
    files: File[];
    subFolders: Folder[];
    parentFolder: Folder | null;  // New parent reference

    constructor(folderName: string, parentFolder: Folder | null = null) {
        this.folderName = folderName;
        this.files = [];
        this.subFolders = [];
        this.parentFolder = parentFolder;
    }

    // Add a file to the folder
    addFile(file: File): void {
        this.files.push(file);
    }

    // Add a subfolder to the folder
    addFolder(folder: Folder): void {
        folder.parentFolder = this; // Set the parent reference
        this.subFolders.push(folder);
    }

    // Find a subfolder by name
    findFolder(folderName: string): Folder | undefined {
        return this.subFolders.find(folder => folder.folderName === folderName);
    }

    // Find a file by name
    findFile(filename: string): File | undefined {
        return this.files.find(file => file.filename === filename);
    }

    // List all files and subfolders
    listContents(): string[] {
        const fileNames = this.files.map(file => file.filename);
        const folderNames = this.subFolders.map(folder => `${folder.folderName}/`);
        return [...fileNames, ...folderNames];
    }
}
