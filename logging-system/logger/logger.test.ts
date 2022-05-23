import { Logger } from './logger';

describe('Logger', () => {
  const callback = jest.fn();
  const context = { data: [1, 2, 3] };
  const name = 'Test name';
  const text = 'some text';
  const timestampMock = 1652813946747;

  let logger: Logger = {} as Logger;

  beforeEach(() => {
    const params = {
      save: callback,
      context,
      name,
    };
    logger = new Logger(params);

    global.Date.now = jest.fn(() => timestampMock);
  });

  it('configureLog configures correct log', () => {
    expect(logger['configureLog'](text, 'INFO')).toEqual({
      timestamp: timestampMock,
      level: 'INFO',
      text,
      name,
      context,
    });
  });

  it('when level info logger must works correctly', () => {
    logger.info(text);
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith({
      timestamp: timestampMock,
      level: 'INFO',
      text,
      name,
      context,
    });
  });

  it('when level debug logger must works correctly', () => {
    logger.debug(text);
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith({
      timestamp: timestampMock,
      level: 'DEBUG',
      text,
      name,
      context,
    });
  });

  it('when level warning logger must works correctly', () => {
    logger.warning(text);
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith({
      timestamp: timestampMock,
      level: 'WARNING',
      text,
      name,
      context,
    });
  });

  it('when level error logger must works correctly', () => {
    logger.error(text);
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith({
      timestamp: timestampMock,
      level: 'ERROR',
      text,
      name,
      context,
    });
  });

  it('when level critical logger must works correctly', () => {
    logger.critical(text);
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith({
      timestamp: timestampMock,
      level: 'CRITICAL',
      text,
      name,
      context,
    });
  });
});
