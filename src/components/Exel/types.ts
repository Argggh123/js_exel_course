import Component from '@core/ExelComponent/Component';
import { IDom } from '@core/Dom/types';

export type ComponentConstructorOptions = {
  name?: string;
  listeners?: string[];
};

export interface ExelComponentConstructor {
  new(element: IDom, options: ComponentConstructorOptions): Component;

  className: string;
}

export type ExelConstructorOptions = {
  components: ExelComponentConstructor[]
};

export interface IExel {
  render(): void;
}
