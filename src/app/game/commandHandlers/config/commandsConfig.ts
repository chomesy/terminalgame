export const commandsConfig = [
  {
    name: "initialize",
    description: `
    Initializes the terminal for user interaction. 
    Usage: initialize
    `,
    methodName: "initialize",
    progressCheck: {
      chapter: 0,
      progress: 1,
    },
  },
  {
    name: "help",
    description: `
    Provides a list of available commands and usage 
    Usage: help or help [command]
    `,
    methodName: "listCommands",
    progressCheck: {
      chapter: 0,
      progress: 1,
    },
  },
  {
    name: "list",
    description: `
    List files in the current directory
    Usage: list
    `,
    methodName: "listFiles",
    progressCheck: {
      chapter: 0,
      progress: 3,
    },
    
  },
  {
    name: "cd",
    description: `
    Change the current directory. 
    Usage: cd <directory>
    Note: use " cd .. " to move back one directory
          or  " cd / " to move to the root directory
    `,
    methodName: "changeDirectory",
    progressCheck: {
      chapter: 0,
      progress: 3,
    },
  },
  {
    name: "read",
    description: `
    Display the contents of a file. 
    Usage: read <filename>
    `,
    methodName: "readFile",
    progressCheck: {
      chapter: 0,
      progress: 3,
    },
  },
  {
    name: "sysinfo",
    description: `
    Display system information such as CPU, memory, and uptime
    Usage: sysinfo
    `,
    methodName: "systemInfo",
    progressCheck: {
      chapter: 0,
      progress: 1,
    },
  },
  {
    name: "slovak",
    description: `
    You weren't supposed to get this far.
    `,
    methodName: "getState",
    progressCheck: {
      chapter: 0,
      progress: 4,
    },
  },
  // Add more commands as needed
];
