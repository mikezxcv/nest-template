import { ILog } from './log.interface';

export interface ICustomError extends ILog {
  error: ILog;
}
