export const mockLogs = [
  {
    name: 'Logger1',
    level: 'INFO',
    context: { a: [1, 2, 3] },
    text: 'testing log',
    timestamp: 1652813946747,
  },
  {
    name: 'Logger2',
    level: 'INFO',
    context: { area: true },
    text: 'testing log',
    timestamp: 1652813946858,
  },
];

export class LocalStorageMock {
  store: any;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: any) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

export const log = {
  name: 'testLog',
  level: 'INFO',
  text: 'some text',
  context: { a: [1, 2, 3] },
  timestamp: 123456,
};
