
export interface logObject {
  logType: string,
  logText: string,
  logTimeStamp: Date,
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