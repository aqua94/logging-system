import { ILog } from '../types';

export abstract class Storage {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract logs: ILog[];
  abstract write(log: ILog): void;
  abstract removeOldLog(): void;
  abstract clear(part: number): void;
  abstract clearAll(): void;
  abstract getLogs(): ILog[];
  abstract actualizeStorage(data: ILog[]): void;
}

export class RAM extends Storage {
  logs: ILog[] = [];

  constructor(name: string) {
    super(name);
  }

  actualizeStorage(data: ILog[]): void {
    this.logs = this.logs.concat(data);
  }

  getLogs(): ILog[] {
    return this.logs;
  }

  write(log: ILog) {
    this.logs.push(log);
  }

  clear(part: number) {
    this.logs.splice(0, part);
  }

  clearAll(): void {
    this.logs = [];
  }

  removeOldLog(): void {
    this.logs.splice(0, 1);
  }
}

export class LocalStorage extends Storage {
  logs: ILog[] = [];

  constructor(name: string) {
    super(name);
    this.logs = this.getLogs();
  }

  private writeInLocalStorage() {
    localStorage.setItem(this.name, JSON.stringify(this.logs));
  }

  actualizeStorage(data: ILog[]): void {
    this.logs = this.logs.concat(data);
    this.writeInLocalStorage();
  }

  getLogs(): ILog[] {
    let local = localStorage.getItem(this.name);
    return local ? JSON.parse(local) : [];
  }

  write(log: ILog) {
    this.logs = this.getLogs();
    this.logs.push(log);
    this.writeInLocalStorage();
  }

  clear(part: number) {
    this.logs = this.getLogs();
    this.logs.splice(0, part);
    this.writeInLocalStorage();
  }

  clearAll(): void {
    this.logs = [];
    this.writeInLocalStorage();
  }

  removeOldLog(): void {
    this.logs = this.getLogs();
    this.logs.splice(0, 1);
    this.writeInLocalStorage();
  }
}
