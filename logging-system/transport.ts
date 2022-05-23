import { ILog } from './types';

export abstract class Transport {
  abstract send(chunk: ILog[]): Promise<unknown>;
}

export class Console extends Transport {
  send(chunk: ILog[]) {
    return new Promise((resolve) => {
      console.log(chunk);
      resolve(true);
    });
  }
}

export class Api extends Transport {
  send(chunk: ILog[]) {
    return new Promise((resolve) => {
      /* imitation of request */
      setTimeout(() => {
        console.log(chunk);
        resolve(true);
      }, 2000);
    });
  }
}
