export class UserInformation {
  username: string;
  password: string;
  permissionLevel: string;
  loggedIn: boolean;

  constructor() {
      this.username = `UNKNOWN`;
      this.password = `default`;
      this.permissionLevel = 'NONE';
      this.loggedIn = false;
  }

  login(username: string, password: string): string {
      if (username === 'dBradshaw' && password === 'GermanicFrogs28') {
          this.username = username;
          this.password = password;
          this.permissionLevel = 'User';
          this.loggedIn = true;
          return `Login Successful. Permission level: ${this.permissionLevel}`;
      }
      this.loggedIn = false;
      return `Login Failed. Username or password is incorrect. Current user: ${this.username}`;
  }

  logout(): void {
      this.username = 'guest';
      this.permissionLevel = 'guest';
      this.loggedIn = false;
  }

  getUserInfo(): string {
      return `Username: ${this.username}
Permission Level: ${this.permissionLevel}`;
  }
}
