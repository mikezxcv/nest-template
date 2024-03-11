export interface ILog<T = any> {
  date: string;
  status: number;
  message: string;
  type: string;
  details: T;
}
