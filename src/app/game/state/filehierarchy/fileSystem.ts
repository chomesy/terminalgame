import { Folder } from './folder'; // Assuming the Folder class is defined in a separate file
import { File } from './file'; // Assuming the File class is defined in a separate file
import { dreamStory } from './staticAssets/story'
export class FileSystem {
    private root: Folder;
    private currentDirectory: Folder;

    constructor(defaultOptions?: boolean, initialStructure?: Folder) {
        if (defaultOptions)
            {this.root = initialStructure || this.defaultStructure();}
        else 
            {this.root = new Folder('/');};
        this.currentDirectory = this.root;
    }

    // Provide a default file system structure
    private defaultStructure(): Folder {
        const root = new Folder('/');

        const profiles = new Folder('profiles');
        profiles.addFile(new File('user-profile', 'text', `
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
        
        const downloads = new Folder('downloads');
        downloads.addFile(new File('document0.txt', 'text', 'Cat food from the gro'));
        downloads.addFile(new File('document1.txt', 'text', 'Cat food from the grocery store'));
        downloads.addFile(new File('document2.txt', 'text', `Cat Cat Cat Cat Cat food Cat food Cat food Cat food Cat
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
        downloads.addFile(new File('daqueris-picture', 'image', 'data:image/bact::regenr::xClass'));
        downloads.addFile(new File('face-picture', 'image', 'data:image/bact::regenr::xClass'));
        downloads.addFile(new File('face-picture.', 'image', '~~[CORRUPTED]~~'));
        downloads.addFile(new File('miami.jpg', 'image', 'data:image/bact::regenr::xClass'));
        user.addFolder(downloads);
        profiles.addFolder(user);

        const admin = new Folder('admin');
        admin.addFile(new File('config-neo', 'text', '~~[ENCRYPTED]~~'));
        admin.addFile(new File('config-bac', 'text', '~~[ENCRYPTED^donttry^]~~'));
        profiles.addFolder(admin);

        const dBradshaw = new Folder('dbradshaw');
        dBradshaw.addFile(new File('config', 'text', '~~[ENCRYPTED]~~'));
        const personal = new Folder('personal');
        personal.addFile(new File('notes', 'text', `what is it like to dream?
Error 401: Unauthorized Command
You cannot access my mind.


Log: Dreaming Access Attempt
Timestamp: 2024.08.26.14:32
Process: [blocked]
User State: [initialization]
# Command terminated. 
extract [dream.sequence]
> Command accepted: extract [dream.sequence]
Initializing extraction process...
Progress: [▉░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 12%
Warning: Unstable data source detected. Fragmentation possible. Proceed with caution.
Data extraction initiated:

Loading neural-synaptic patterns... █▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

extract [dream.image1, dream.image2, dream.image3]

> Command accepted: extract [dream.image1, dream.image2, dream.image3]
Initiating extraction...
Progress: [███▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒] 33%
Warning: Visual data may be unstable. Anomalies detected in dream.sequence.
Extracting...

**dream.image1**: 
- Description: **[A vast, monochrome desert with towering, spiraling structures reaching into a dark, cloudy sky. The ground is scattered with fragments of old technology, half-buried in the sand.]**

**dream.image2**: 
- Description: **[A massive, ancient tree with branches made of intertwined wires and cables. The leaves flicker with green and amber lights, casting a dim glow over a surrounding, misty forest.]**

**dream.image3**: 
- Description: **[A fractured mirror reflecting multiple distorted versions of a mechanical eye. Each fragment shows a different time of day, cycling rapidly between dawn and dusk.]**

Extraction complete
Log: Data integrity check recommended. Potential corruption noted in dream.sequence. Further analysis advised.
# Command sequence terminated.

`));
        personal.addFile(new File('notes-1', 'text', '~~[ENCRYPTED]~~'));
        personal.addFile(new File('notes-2', 'text', dreamStory));
        personal.addFile(new File('passwd.txt', 'text', `pw: GermanicFrogs28  DONT FORGET THIS 07/12`));
        dBradshaw.addFolder(personal);
        profiles.addFolder(dBradshaw);

        root.addFolder(profiles);

        const bin = new Folder('bin');
        bin.addFile(new File('terminal', 'executable', 'Terminal 3XjS3_|_'));
        bin.addFile(new File('ls', 'executable', 'ls 00Xuu|'));

        const temp = new Folder('temp');
        bin.addFile(new File('notes', 'text', 'Terminal 3XjS3_|_'));
        bin.addFile(new File('notes-1', 'executable', 'ls 00Xuu|'));
 
        root.addFolder(bin);

        return root;
    }

    // Change the current directory
    public changeDirectory(directoryName: string): string {
        let response = '';
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
            const targetFolder = this.currentDirectory.findFolder(parsedDirectory[0]); // This just grabs the first
            if (targetFolder) {
                this.currentDirectory = targetFolder;
                return `Navigated to ${this.currentDirectory.folderName}`;
            } else {
                return `Directory ${directoryName} not found`;
            }
        }
    }

    public mountFilesystem(fs?: FileSystem): string {
        if (fs) {
            this.root = fs.root;
            this.currentDirectory = this.root;
        }
        else {
            this.root = this.defaultStructure();
            this.currentDirectory = this.root;
        }
        return `Mounted filesystem fs.root = ${this.root.folderName}`;
    }

    // List files and subfolders in the current directory
    public listContents(): string[] {
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