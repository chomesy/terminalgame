export type logTypeString = 'info' | 'command' | 'response' | 'error' | 'aicomms';
export interface logObject {
  logType: logTypeString,
  logText: string,
  logTimeStamp: Date,
  logSubmitter: string,
}

export class SystemLog {
  log: logObject[];

  constructor() {
    this.log = [];
    
  }

  addLog(newLog: logObject): void {
    this.log.push(newLog);
  }
}