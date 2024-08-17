export class Command {
  name: string;
  description: string;
  action: (args: string[]) => string;

  constructor(name: string, description: string, action: (args: string[]) => string) {
      this.name = name;
      this.description = description;
      this.action = action;
  }
}
