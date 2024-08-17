export const commandsConfig = [
  {
    name: "ls",
    description: "List files in the current directory",
    method: "listFiles",
  },
  {
    name: "cd",
    description: "Change the current directory. Usage: cd <directory>",
    method: "changeDirectory",
  },
  {
    name: "cat",
    description: "Display the contents of a file. Usage: cat <filename>",
    method: "readFile",
  },
  {
    name: "sysinfo",
    description: "Display system information such as CPU, memory, and uptime",
    method: "systemInfo",
  },
  // Add more commands as needed
];
