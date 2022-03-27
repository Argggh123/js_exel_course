export type ObserverFn<P extends any[]> = (...args: P) => void;

export interface IObserver {
  subscribe<P extends any[]>(eventName: string, executor: ObserverFn<P>): Function;

  dispatch<T extends any[]>(eventName: string, ...params: T): void;
}

export type ListenerObject = {
  [K: string]: Array<ObserverFn<any[]>>;
};
