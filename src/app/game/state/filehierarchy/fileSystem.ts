import path from 'path';
import { File } from './file'; // Assuming the File class is defined in a separate file

interface FileSystemStructure {
    [key: string]: FileSystemStructure | File[];
}

export class FileSystem {
    private structure: FileSystemStructure;
    private currentDirectory: string;

    constructor(initialStructure?: FileSystemStructure) {
        this.currentDirectory = '/';
        this.structure = initialStructure || this.defaultStructure();
    }

    // Provide a default file system structure
    private defaultStructure(): FileSystemStructure {
        return {
            "/": {
                "home": {
                    "user": [
                        new File('document.txt', 'text', 'This is the content of the document.'),
                        new File('photo.jpg', 'image', 'data:image/jpeg;base64,...')
                    ],
                    "admin": [
                        new File('config.sys', 'text', 'System configuration details...')
                    ]
                },
                "bin": [
                    new File('bash', 'executable', '/usr/bin/bash'),
                    new File('ls', 'executable', '/bin/ls')
                ],
                
            }
        };
    }

    // Resolve the directory path to handle ".", "..", and absolute paths
    private resolvePath(directory: string): string {
        const parts = path.normalize(path.join(this.currentDirectory, directory)).split(path.sep);
        const resolvedParts: string[] = [];

        for (const part of parts) {
            if (part === '.' || part === '') continue;
            if (part === '..') {
                if (resolvedParts.length > 0) {
                    resolvedParts.pop();
                }
            } else {
                resolvedParts.push(part);
            }
        }

        return '/' + resolvedParts.join('/');
    }

    // Navigate to a specific directory in the file system structure
    private navigate(directory: string): FileSystemStructure | File[] {
        const resolvedPath = this.resolvePath(directory);
        const pathParts = resolvedPath.split('/').filter(Boolean);
        let currentDir: FileSystemStructure | File[] = this.structure;

        for (const part of pathParts) {
            if (typeof currentDir === 'object' && !Array.isArray(currentDir) && currentDir[part]) {
                currentDir = currentDir[part];
            } else {
                throw new Error(`Directory ${resolvedPath} not found`);
            }
        }

        return currentDir;
    }

    // Change the current directory
    public changeDirectory(directory: string): void {
        const resolvedPath = this.resolvePath(directory);
        this.navigate(resolvedPath); // Validate the directory exists
        this.currentDirectory = resolvedPath;
    }

    // List files in the current directory or a specified directory
    public listFiles(directory: string = this.currentDirectory): string[] {
        const dir = this.navigate(directory);
        if (Array.isArray(dir)) {
            return dir.map(file => file.filename);
        } else {
            return Object.keys(dir);
        }
    }

    // Create a new file in the current directory or a specified directory
    public createFile(filename: string, content: string, mediaType: string = 'text', metadata: Record<string, any> = {}, directory: string = this.currentDirectory): void {
        const dir = this.navigate(directory);
        if (Array.isArray(dir)) {
            const newFile = new File(filename, mediaType, content, metadata);
            dir.push(newFile);
        } else {
            throw new Error(`Cannot create file in ${directory}: it is not a valid directory`);
        }
    }

    // Delete a file from the current directory or a specified directory
    public deleteFile(filename: string, directory: string = this.currentDirectory): void {
        const dir = this.navigate(directory);
        if (Array.isArray(dir)) {
            const fileIndex = dir.findIndex(file => file.filename === filename);
            if (fileIndex !== -1) {
                dir.splice(fileIndex, 1);
            } else {
                throw new Error(`File ${filename} not found in directory ${directory}`);
            }
        } else {
            throw new Error(`Cannot delete file from ${directory}: it is not a valid directory`);
        }
    }

    // Create a new directory in the current directory or a specified directory
    public createDirectory(directoryName: string, parentDirectory: string = this.currentDirectory): void {
        const dir = this.navigate(parentDirectory);
        if (Array.isArray(dir)) {
            throw new Error(`Cannot create directory in ${parentDirectory}: it is not a valid directory`);
        } else {
            dir[directoryName] = [];
        }
    }

    // Delete a directory from the current directory or a specified directory
    public deleteDirectory(directoryName: string, parentDirectory: string = this.currentDirectory): void {
        const dir = this.navigate(parentDirectory);
        if (!Array.isArray(dir) && dir[directoryName]) {
            delete dir[directoryName];
        } else {
            throw new Error(`Cannot delete directory ${directoryName}: it does not exist in ${parentDirectory}`);
        }
    }

    // Retrieve a file object by its path in the current directory or a specified directory
    public getFile(filename: string, directory: string = this.currentDirectory): File | undefined {
        const dir = this.navigate(directory);
        if (Array.isArray(dir)) {
            return dir.find(file => file.filename === filename);
        }
        throw new Error(`Cannot retrieve file from ${directory}: it is not a valid directory`);
    }

    // Optional: Method to return the entire file system structure
    public getStructure(): FileSystemStructure {
        return this.structure;
    }
}
