import { LoggingSystem } from './logging-system';
import { Storage, LocalStorage, RAM } from './storage';
import { Transport, Console, Api } from './transport';

export const storages = {
  LocalStorage,
  RAM,
};

export const transports = {
  Console,
  Api,
};

export { LoggingSystem, Storage, Transport };
