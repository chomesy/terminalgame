import { Subject } from 'rxjs';

import { logObject } from './systemLog';

export class SystemLogStream {
  
private logSubject = new Subject<logObject>();

  getObservable() {
    return this.logSubject.asObservable();
  }

  updateLog(systemLog: logObject) {
    this.logSubject.next(systemLog);
  }

  postInfoLog(message: string) {
    const newLog: logObject = {
      logType: 'info',
      logText: message,
      logTimeStamp: new Date(),
    };
    this.logSubject.next(newLog);
  }

  postUserCommandLog(message: string){
    const newLog: logObject = {
      logType: 'command',
      logText: message,
      logTimeStamp: new Date(),
    }
    this.logSubject.next(newLog);
  }

  postErrorLog(message: string) {
    const newLog: logObject = {
      logType: 'error',
      logText: message,
      logTimeStamp: new Date(),
    };
    this.logSubject.next(newLog);
  }

  postTerminalResponseLog(message: string) {
    const newLog: logObject = {
      logType: 'response',
      logText: message,
      logTimeStamp: new Date(),
    };
    this.logSubject.next(newLog);
  }
}
