export interface ActiveTask {
    name: string;
    status: string;
    progress: number;
}

export class HackingTools {
    installedTools: string[];
    activeTasks: ActiveTask[];

    constructor() {
        this.installedTools = ['nmap', 'netcat'];
        this.activeTasks = [];
    }

    installTool(toolName: string): void {
        if (!this.installedTools.includes(toolName)) {
            this.installedTools.push(toolName);
        }
    }

    startTask(taskName: string): void {
        this.activeTasks.push({ name: taskName, status: 'running', progress: 0 });
    }

    updateTaskProgress(taskName: string, progress: number): void {
        const task = this.activeTasks.find(t => t.name === taskName);
        if (task) {
            task.progress = progress;
        }
    }

    completeTask(taskName: string): void {
        const task = this.activeTasks.find(t => t.name === taskName);
        if (task) {
            task.status = 'completed';
        }
    }
}
