export type ILevel = 'INFO' | 'DEBUG' | 'WARNING' | 'ERROR' | 'CRITICAL';

export interface ILog {
  timestamp: number;
  text: string;
  name: string;
  level: ILevel;
  context: { [key: string]: any };
}
