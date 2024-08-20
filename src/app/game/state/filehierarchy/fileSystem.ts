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
        home.addFile(new File('user-profile', 'text', `
# [USER: def0293449@term.default]
# [Core]
pwr = Bal
cool = Hi

# [Display]
br = 75
sat = 85
eng = 60
exp = 1.03

# [Backdrop]
bg = Nebula
anim = Med

# [UI]
~~DEFINE DEFAULT: 'terminal'~~
~~DEFINE OVERRIDE: 'terminal'~~
~~DEF             ... XY_speed = Fast
fx = Fade
!erg


# [Thermal]
max_temp = 90C
alert = 85C

# [Sound]
cool_noise = Lo
notif = Org
harmony = On
            `));
        
        const user = new Folder('user');
        user.addFile(new File('document0.txt', 'text', 'Cat food from the gro'));
        user.addFile(new File('document1.txt', 'text', 'Cat food from the grocery store'));
        user.addFile(new File('document2.txt', 'text', `Cat Cat Cat Cat Cat food Cat food Cat food Cat food Cat
            food from the gr
            food f∂¬m the ˙∂
            fπßœµfrom the gr
            food from the grocery s
            ~~[CORRUPTED]~~
            food from the gro~~[CORRUPTED]~~~~[CORRUPTED}~~
            ood~~DONT~~from~~MOVE~~the~~gr00Xuu|~~
            
            ø

            ø
            `));
        user.addFile(new File('daqueris-picture', 'image', 'data:image/bact::regenr::xClass'));
        user.addFile(new File('face-picture', 'image', 'data:image/bact::regenr::xClass'));
        user.addFile(new File('face-picture.', 'image', '~~[CORRUPTED]~~'));
        user.addFile(new File('miami.jpg', 'image', 'data:image/bact::regenr::xClass'));
        
        const admin = new Folder('admin');
        admin.addFile(new File('config-neo', 'text', '~~[ENCRYPTED]~~'));
        admin.addFile(new File('config-bac', 'text', '~~[ENCRYPTED^donttry^]~~'));
        home.addFolder(user);
        home.addFolder(admin);

        root.addFolder(home);

        const bin = new Folder('bin');
        bin.addFile(new File('terminal', 'executable', 'Terminal 3XjS3_|_'));
        bin.addFile(new File('ls', 'executable', 'ls 00Xuu|'));
 
        root.addFolder(bin);

        return root;
    }

    // Change the current directory
    public changeDirectory(directoryName: string): string {
        var response = `directoryName= ${directoryName} `;
        if (directoryName.startsWith('/')) {
                this.currentDirectory = this.root;
                response += `Navigated to /`;
                const parsedDirectory = directoryName.split('/');
                for (let directory of parsedDirectory) {
                    if (directory !== ''){
                        const targetFolder = this.currentDirectory.findFolder(directory);
                        if (targetFolder) {
                            this.currentDirectory = targetFolder;
                            response+=`${directory}/`;
                        } else {
                            response+=`\n .. and then directory ${directory} was not found`;
                        }
                    }
                }
                return response;


        } else if (directoryName === '..') {
            if (this.currentDirectory.parentFolder) {
                this.currentDirectory = this.currentDirectory.parentFolder;
                return `Navigated to ${this.currentDirectory.folderName}`;
            } else {
                return("Already at the root directory. Cannot go up.");
            }
        } else {
            //TODO: Turn this into a "for (let directory of parsedDirectory)" loop over all directories
            const parsedDirectory = directoryName.split('/');
            const targetFolder = this.currentDirectory.findFolder(directoryName);
            if (targetFolder) {
                this.currentDirectory = targetFolder;
                return `Navigated to ${this.currentDirectory.folderName}`;
            } else {
                return `Directory ${directoryName} not found`;
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