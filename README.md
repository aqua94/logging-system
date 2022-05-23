# Logging system v1.0

## Get started

To start using Logging system you should create new LoggingSystem system.

The system has one required parameter - `name`.

```typescript
const loggingSystem = new LoggingSystem('LOGGING_SYSTEM');
```

In addition, you can flexibly configure the system by adding specified settings.

```typescript
import { LoggingSystem, storages, transports } from './logging-system';

const loggingSystem = new LoggingSystem('LOGGING_SYSTEM')

  .setTransport(new transports.Api())

  .setStorage(new storages.LocalStorage())

  .setLimits(100, 20);
```

`setTransport` makes it possible to manually set the method for unloading logs.

The method can be created independently in accordance with internal class Transport.

By default, logs unloading to browser console.

`setStorage` makes it possible to manually set the log storage method.

The method can be created independently in accordance with internal class Storage.

By default, logs saving in RAM.

`setLimits` makes it possible to manually set limit of storage and unloaded

logs part size. By default, storage limit is 10 logs, chunk size is 3.

## Create logger

Use createLogger method from LoggingSystem instance to create logger.

You can write logs of the five levels: `INFO`, `DEBUG`, `WARNING`, `ERROR`, `CRITICAL`.

```typescript
const logger = system.createLogger('First logger', context);

logger.info('This is log with information');

logger.warning('This is log with warning');
```

You can create as much as you like loggers from one LoggingSystem instance.

All loggers would have same storage and settings.

You can immediately output logs to the console when they are created.

```typescript
logger.setConsole();
```
