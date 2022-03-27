import { IObserver, ListenerObject, ObserverFn } from '@core/Observer/types';

export default class Observer implements IObserver {
  private static instance: Observer;

  constructor(private listeners: ListenerObject = {}) {
    if (Observer.instance) {
      return Observer.instance;
    }

    Observer.instance = this;
  }

  private setEventKey(eventName: string): void {
    if (this.listeners[eventName]) {
      return;
    }

    this.listeners[eventName] = [];
  }

  private removeExecutor(eventName: string, executor): ObserverFn<any>[] {
    return this.listeners[eventName].filter((execFn) => executor !== execFn);
  }

  subscribe<P extends any[]>(eventName: string, executor: ObserverFn<P>): Function {
    this.setEventKey(eventName);
    this.listeners[eventName].push(executor);
    return () => {
      this.listeners[eventName] = this.removeExecutor(eventName, executor);
    };
  }

  dispatch<T extends any[]>(eventName: string, ...params: T) {
    this.listeners[eventName]
      .forEach((exec) => {
        exec(...params);
      });
  }
}
