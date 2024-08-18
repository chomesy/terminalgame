

export interface SystemHealth {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
}

export class SystemInformation {
  systemHealth: SystemHealth;
  osVersion: string;
  uptime: number; // in milliseconds
  processList: string[];
  timeStamp: Date;
  systemTime: Date;
  private timeOffset= {'years':3, 'months': 1, 'days':8, 'hours':6, 'minutes':1, 'seconds':14} // random numbers
  private timeOffsetInMilliseconds = 1000*(this.timeOffset.seconds + 60*(this.timeOffset.minutes + 60*(this.timeOffset.hours + 24*(this.timeOffset.days + 30*this.timeOffset.months + 365*this.timeOffset.years))))

  constructor() {
      this.systemHealth = {
          cpu: 30,
          memory: 50,
          storage: 70,
          network: 90
      };
      this.osVersion = 'BPoS © 1987-2024 BPoS.Alpha.003';
      this.uptime = 0;
      this.processList = [];
      this.timeStamp = new Date(); // This sets the time to the time of construction
      this.systemTime = new Date(this.timeStamp.getTime() + this.timeOffsetInMilliseconds);
  }

  refreshUptime(): void {
      const now = new Date();
      const diff = now.getTime() - this.timeStamp.getTime();
      this.systemTime = new Date(this.timeStamp.getTime() + this.timeOffsetInMilliseconds + diff);

      this.uptime = Math.floor(diff / 1000);
  }

  addProcess(processName: string): void {
      this.processList.push(processName);
  }

  removeProcess(processName: string): void {
      this.processList = this.processList.filter(p => p !== processName);
  }

  updateUptime(uptime: number): void {
      this.uptime = uptime;
  }
}
