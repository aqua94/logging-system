import { Storage, LocalStorage } from './storage';
import { ILog } from '../types';
import { mockLogs, LocalStorageMock, log } from './mocks';
const NAME = 'testName';

describe('Storage', () => {
  describe('LocalStorage', () => {
    // @ts-ignore
    global.localStorage = new LocalStorageMock();
    let storage: Storage = {} as LocalStorage;
    let log: ILog = {} as ILog;

    describe('Empty LocalStorage', () => {
      beforeEach(() => {
        storage = new LocalStorage(NAME);
      });

      it('when localStorage initialized logs is empty', () => {
        expect(storage.getLogs()).toEqual([]);
      });

      it('when log is created it writes into localStorage', () => {
        storage.write(log);
        expect(storage.getLogs()).toEqual([log]);
      });

      it('when clear storage logs is empty', () => {
        storage.clearAll();
        expect(storage.getLogs()).toEqual([]);
      });
    });

    describe('Full LocalStorage', () => {
      beforeEach(() => {
        storage = new LocalStorage(NAME);
        localStorage.setItem(NAME, JSON.stringify(mockLogs));
      });

      it('when localStorage initialized logs is full', () => {
        expect(storage.getLogs()).toEqual(mockLogs);
      });

      it('when log is created it writes into localStorage', () => {
        storage.write(log);
        expect(storage.getLogs()).toEqual([...mockLogs, log]);
      });

      it('when clear storage logs is empty', () => {
        storage.clearAll();
        expect(storage.getLogs()).toEqual([]);
      });
    });
  });
});
