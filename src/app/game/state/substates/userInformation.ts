export class UserInformation {
  username: string;
  permissionLevel: string;
  loggedIn: boolean;

  constructor() {
      this.username = `UNKNOWN`;
      this.permissionLevel = 'guest';
      this.loggedIn = false;
  }

  login(username: string, permissionLevel: string): void {
      this.username = username;
      this.permissionLevel = permissionLevel;
      this.loggedIn = true;
  }

  logout(): void {
      this.username = 'guest';
      this.permissionLevel = 'guest';
      this.loggedIn = false;
  }
}
