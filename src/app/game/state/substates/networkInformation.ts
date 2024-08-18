export class NetworkInformation {
  connectedNetwork: string;
  networkStatus: string;
  firewallStatus: boolean;

  constructor() {
      this.connectedNetwork = '127.0.0.1';
      this.networkStatus = 'disconnected';
      this.firewallStatus = true;
  }

  connectToNetwork(network: string): void {
      this.connectedNetwork = network;
      this.networkStatus = 'connected';
  }

  disconnectNetwork(): void {
      this.connectedNetwork = '127.0.0.1';
      this.networkStatus = 'disconnected';
  }
}
