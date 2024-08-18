

export class SystemLog {
  log: string[] = [];
  constructor() {
    this.log = [];
  }

  addLog(log: string): void {
    this.log.push(log);
  }
}