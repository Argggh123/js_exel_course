import { ObserverFn } from '@core/Observer/types';

export interface IComponent {
  toHtml(): string;

  init(): void;

  destroy(): void;
}

export interface IComponentWithObserver {
  $dispatch<T extends any[]>(eventName: string, ...params: T): void;

  $subscribe<T extends any[]>(eventName: string, fn: ObserverFn<T>): void;
}
