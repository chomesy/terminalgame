export class FileSystem {
  currentDirectory: string;
  fileStructure: Record<string, string[]>;

  constructor() {
      this.currentDirectory = '/';
      this.fileStructure = {
          '/': ['readme.txt', 'syslog.log']
      };
  }

  listFiles(): string[] {
      return this.fileStructure[this.currentDirectory] || [];
  }

  changeDirectory(newDirectory: string): void {
      if (this.fileStructure[newDirectory]) {
          this.currentDirectory = newDirectory;
      } else {
          throw new Error('Directory not found');
      }
  }
}
