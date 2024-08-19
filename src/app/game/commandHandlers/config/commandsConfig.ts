export const commandsConfig = [
  {
    name: "boot",
    description: "Boot terminal",
    methodName: "boot",
    progressCheck: {
      chapter: 0,
      progress: 1,
    },
  },
  {
    name: "help",
    description: "List all available commands",
    methodName: "listCommands",
    progressCheck: {
      chapter: 0,
      progress: 1,
    },
  },
  {
    name: "ls",
    description: "List files in the current directory",
    methodName: "listFiles",
    progressCheck: {
      chapter: 0,
      progress: 2,
    },
    
  },
  {
    name: "cd",
    description: "Change the current directory. Usage: cd <directory>",
    methodName: "changeDirectory",
    progressCheck: {
      chapter: 0,
      progress: 2,
    },
  },
  {
    name: "cat",
    description: "Display the contents of a file. Usage: cat <filename>",
    methodName: "readFile",
    progressCheck: {
      chapter: 0,
      progress: 2,
    },
  },
  {
    name: "sysinfo",
    description: "Display system information such as CPU, memory, and uptime",
    methodName: "systemInfo",
    progressCheck: {
      chapter: 0,
      progress: 1,
    },
  },
  // Add more commands as needed
];
