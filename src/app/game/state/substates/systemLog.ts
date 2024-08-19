
export interface logObject {
  logType: string,
  logText: string,
  logTimeStamp: Date,
}

export class SystemLog {
  log: string[] = [];
  detailedLog: logObject[] = [];

  constructor() {
    this.log = [];
    
  }

  addLog(log: string): void {
    this.log.push(log);
  }
}