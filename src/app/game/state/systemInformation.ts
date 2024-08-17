export interface SystemHealth {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
}

export class SystemInformation {
  systemHealth: SystemHealth;
  osVersion: string;
  uptime: string;
  processList: string[];

  constructor() {
      this.systemHealth = {
          cpu: 30,
          memory: 50,
          storage: 70,
          network: 90
      };
      this.osVersion = '1.0.0';
      this.uptime = '0:00:00';
      this.processList = [];
  }

  addProcess(processName: string): void {
      this.processList.push(processName);
  }

  removeProcess(processName: string): void {
      this.processList = this.processList.filter(p => p !== processName);
  }

  updateUptime(uptime: string): void {
      this.uptime = uptime;
  }
}
