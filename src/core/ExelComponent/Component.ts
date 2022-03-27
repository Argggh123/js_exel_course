import DomListener from '@core/DomListener/DomListener';
import { IComponent, IComponentWithObserver } from '@core/ExelComponent/types';
import { IDom } from '@core/Dom/types';
import { ComponentConstructorOptions } from '@/components/Exel/types';
import { IObserver, ObserverFn } from '@core/Observer/types';
import Observer from '@core/Observer/Observer';

export default abstract class Component
  extends DomListener
  implements IComponent, IComponentWithObserver {
  private readonly unsubscribes: Array<Function> = [];

  protected constructor(
    $root: IDom,
    options: ComponentConstructorOptions,
    private readonly observer: IObserver = new Observer(),
  ) {
    super($root, {
      ...options,
    });
  }

  abstract toHtml(): string;

  prepare() {}

  $dispatch<T extends any[]>(eventName: string, ...params: T): void {
    this.observer.dispatch<T>(eventName, ...params);
  }

  $subscribe<T extends any[]>(eventName: string, fn: ObserverFn<T>): void {
    const unsub = this.observer.subscribe<T>(eventName, fn);
    this.unsubscribes.push(unsub);
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribes.forEach((unsub) => unsub());
  }
}
