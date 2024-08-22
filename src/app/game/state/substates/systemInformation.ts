

export interface SystemHealth {
  cpu: number;
  memoryVolume: number;
  memoryPressure: number;
  memoryTemperature: number;
  storage: number;
  network: number;
  battery: number;
}

export class SystemInformation {
  systemHealth: SystemHealth;
  osVersion: string;
  uptime: number; // in seconds
  processList: string[];
  private timeStamp: Date;
  private systemTime: Date;
  private timeOffset= {'years':3, 'months': 1, 'days':8, 'hours':6, 'minutes':1, 'seconds':14} // random numbers
  private timeOffsetInMilliseconds = 1000*(this.timeOffset.seconds + 60*(this.timeOffset.minutes + 60*(this.timeOffset.hours + 24*(this.timeOffset.days + 30*this.timeOffset.months + 365*this.timeOffset.years))))

  constructor() {
      this.systemHealth = {
          cpu: 19,
          memoryVolume: 0.03, // Cubic Ft
          memoryPressure: 88.3, // PSI
          memoryTemperature: 90, // Celsius
          storage: 71.24,
          network: 90,
          battery: 6,
      };
      this.osVersion = 'BPoS © 1987-2027 BPoS.Alpha.003';
      this.uptime = 0;
      this.processList = [];
      this.timeStamp = new Date(); // This sets the time to the time of construction
      this.systemTime = new Date(this.timeStamp.getTime() + this.timeOffsetInMilliseconds);
  }

  refreshSystemInfo(): void {
    const now = new Date();
    const diff = now.getTime() - this.timeStamp.getTime();
    this.systemTime = new Date(this.timeStamp.getTime() + this.timeOffsetInMilliseconds + diff);
    this.uptime = Math.floor(diff / 1000);
  }

  getSystemTime(): Date {
    this.refreshSystemInfo();
    return this.systemTime;
  }

  addProcess(processName: string): void {
      this.refreshSystemInfo();
      this.processList.push(processName);
  }

  removeProcess(processName: string): void {
      this.refreshSystemInfo();
      this.processList = this.processList.filter(p => p !== processName);
  }

}
