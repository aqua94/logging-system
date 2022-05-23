import { Logger } from './logger';
import { Storage, RAM } from './storage';
import { Transport, Console } from './transport';
import { config } from './config';
import { ILog } from './types';

export class LoggingSystem {
  private name: string;
  private storage: Storage = new RAM('');
  private transport: Transport = new Console();
  private limit: number = config.limit;
  private part: number = config.part;
  private timer: any;
  private canClear: boolean = true;

  constructor(name: string) {
    this.name = name;
    this.checkTimer();
  }

  setStorage(storage: Storage) {
    let logs = this.storage.getLogs() || [];
    this.storage.clearAll();
    this.storage = storage;
    this.storage.actualizeStorage(logs);
    return this;
  }

  setLimits(limit: number, part: number) {
    this.limit = limit;
    this.part = part;
    return this;
  }

  setTransport(transport: Transport) {
    this.transport = transport;
    return this;
  }

  createLogger(name: string, context: { [key: string]: any }): Logger {
    return new Logger({
      name,
      context,
      save: this.writeLog.bind(this),
    });
  }

  private checkStorage() {
    if (this.storage.logs.length >= this.limit) {
      clearInterval(this.timer);
      this.clearStorage();
    }
  }

  private async clearStorage() {
    if (this.canClear) {
      this.canClear = false;
      while (this.storage.logs.length) {
        try {
          await this.transport.send(this.storage.logs.slice(0, this.part));
          this.storage.clear(this.part);
        } catch (err) {
          //...ERROR
        }
      }

      if (!this.storage.logs.length) {
        this.canClear = true;
        this.checkTimer();
      }
    }
  }

  private checkTimer() {
    this.timer = setTimeout(() => {
      this.clearStorage();
    }, 50000);
  }

  private writeLog(log: ILog) {
    if (this.storage.logs.length >= this.limit) {
      this.storage.removeOldLog();
    }
    this.storage.write.bind(this.storage)(log);
    this.checkStorage();
  }
}
