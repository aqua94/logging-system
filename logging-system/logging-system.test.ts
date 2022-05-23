import { LoggingSystem } from './logging-system';

describe('LoggingSystem', () => {
  const NAME = 'logger';
  const CONTEXT = {
    data: [1, 2, 3],
  };
  let system: LoggingSystem = {} as LoggingSystem;
  let save = jest.fn();

  beforeEach(() => {
    system = new LoggingSystem('TEST');
  });

  it('createLogger is creating logger', () => {
    let logger = system.createLogger(NAME, CONTEXT);
    expect(logger['name']).toEqual(NAME);
  });
});
