import { Folder } from './folder'; // Assuming the Folder class is defined in a separate file
import { File } from './file'; // Assuming the File class is defined in a separate file

export class FileSystem {
    private root: Folder;
    private currentDirectory: Folder;

    constructor(initialStructure?: Folder) {
        this.root = initialStructure || this.defaultStructure();
        this.currentDirectory = this.root;
    }

    // Provide a default file system structure
    private defaultStructure(): Folder {
        const root = new Folder('/');

        const home = new Folder('home');
        const user = new Folder('user');
        const admin = new Folder('admin');
        user.addFile(new File('document.txt', 'text', 'This is the content of the document.'));
        user.addFile(new File('photo.jpg', 'image', 'data:image/jpeg;base64,...'));
        admin.addFile(new File('config.sys', 'text', 'System configuration details...'));
        home.addFolder(user);
        home.addFolder(admin);

        const bin = new Folder('bin');
        bin.addFile(new File('bash', 'executable', '/usr/bin/bash'));
        bin.addFile(new File('ls', 'executable', '/bin/ls'));

        root.addFolder(home);
        root.addFolder(bin);

        return root;
    }

    // Change the current directory
    public changeDirectory(directoryName: string): void {
        if (directoryName === '/') {
            this.currentDirectory = this.root;
        } else if (directoryName === '..') {
            if (this.currentDirectory.parentFolder) {
                this.currentDirectory = this.currentDirectory.parentFolder;
            } else {
                console.error("Already at the root directory. Cannot go up.");
            }
        } else {
            const targetFolder = this.currentDirectory.findFolder(directoryName);
            if (targetFolder) {
                this.currentDirectory = targetFolder;
            } else {
                throw new Error(`Directory ${directoryName} not found`);
            }
        }
    }

    // List files and subfolders in the current directory
    public listFiles(): string[] {
        return this.currentDirectory.listContents();
    }

    // Create a new file in the current directory
    public createFile(filename: string, content: string, mediaType: string = 'text', metadata: Record<string, any> = {}): void {
        const newFile = new File(filename, mediaType, content, metadata);
        this.currentDirectory.addFile(newFile);
    }

    // Create a new directory in the current directory
    public createDirectory(directoryName: string): void {
        const newFolder = new Folder(directoryName, this.currentDirectory); // Set the parent reference
        this.currentDirectory.addFolder(newFolder);
    }

    // Retrieve a file object by its path in the current directory
    public getFile(filename: string): File | undefined {
        return this.currentDirectory.findFile(filename);
    }

    // Get current directory
    public getCurrentDirectory(): string {
        return this.currentDirectory.folderName
    }
}