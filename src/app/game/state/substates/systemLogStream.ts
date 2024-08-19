import { Subject } from 'rxjs';

export class SystemLogStream {
  
private logSubject = new Subject<string[]>();

  getLogStream() {
    return this.logSubject.asObservable();
  }

  updateLog(logData: string[]) {
    this.logSubject.next(logData);
  }
}
