export class SessionInformation {
  commandHistory: string[];
  outputBuffer: string[];
  sessionLogs: string[];
  

  constructor() {
      this.commandHistory = [];
      this.outputBuffer = [];
      this.sessionLogs = [];
  }

  addCommandToHistory(command: string): void {
      this.commandHistory.push(command);
  }

  addOutput(output: string): void {
      this.outputBuffer.push(output);
  }

  addSessionLog(log: string): void {
      this.sessionLogs.push(log);
  }
}
