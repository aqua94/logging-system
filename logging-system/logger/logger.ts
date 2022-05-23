import { ILevel, ILog } from '../types';

interface Props {
  name: string;
  context: { [key: string]: any };
  save: (log: ILog) => void;
}

export class Logger {
  private readonly name: string;
  private readonly context: { [key: string]: any };
  private readonly save: (log: ILog) => void;
  private console: boolean = false;

  constructor({ name, context, save }: Props) {
    this.name = name;
    this.context = context;
    this.save = save;
  }

  private configureLog(text: string, level: ILevel): ILog {
    return {
      text,
      level,
      name: this.name,
      context: this.context,
      timestamp: Date.now(),
    };
  }

  private createLog = (level: ILevel) => {
    return (text: string) => {
      let log = this.configureLog(text, level);
      this.save(log);
      if (this.console) {
        console.log(log);
      }
    };
  };

  setConsole() {
    /* show created log on console */
    this.console = true;
  }

  info = this.createLog('INFO');

  debug = this.createLog('DEBUG');

  warning = this.createLog('WARNING');

  error = this.createLog('ERROR');

  critical = this.createLog('CRITICAL');
}
