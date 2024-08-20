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

  postInfoLog(message: string, logTimeStamp = new Date()) {
    const newLog: logObject = {
      logType: 'info',
      logText: message,
      logTimeStamp: logTimeStamp,
      logSubmitter: 'system'
    };
    this.logSubject.next(newLog);
  }

  postUserCommandLog(message: string, currentUser: string, logTimeStamp= new Date()){
    const newLog: logObject = {
      logType: 'command',
      logText: message,
      logTimeStamp: logTimeStamp,
      logSubmitter: currentUser,
    }
    this.logSubject.next(newLog);
  }

  postErrorLog(message: string, logTimeStamp= new Date()) {
    const newLog: logObject = {
      logType: 'error',
      logText: message,
      logTimeStamp: logTimeStamp,
      logSubmitter: 'system',
    };
    this.logSubject.next(newLog);
  }

  postTerminalResponseLog(message: string, logTimeStamp= new Date()) {
    const newLog: logObject = {
      logType: 'response',
      logText: message,
      logTimeStamp: logTimeStamp,
      logSubmitter: 'system',
    };
    this.logSubject.next(newLog);
  }

  postAICommunicationLog(message: string, logTimeStamp= new Date()) {
    const newLog: logObject = {
      logType: 'aicomms',
      logText: message,
      logTimeStamp: logTimeStamp,
      logSubmitter: 'ai',
    };
    this.logSubject.next(newLog);
  }
  
}
