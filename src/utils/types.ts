import ExelComponent from '@core/ExelComponent/ExelComponent';
import { Dom } from '@core/Dom/Dom';

export type ExelComponentConstructorOptions = {
  name: string;
  listeners?: string[];
};

export type DomClassElement = HTMLElement | Dom;

export interface ExelComponentConstructor {
  new(element: DomClassElement, options: ExelComponentConstructorOptions): ExelComponent;

  className?: string
}

export interface DomListenerInterface {
  $root: DomClassElement;
}

export interface DomInterface {
  html(html?: string): Dom | string;

  clear(): Dom;

  append(node: DomClassElement): Dom;

  on(eventType: string, callback: Function): void;
}

export interface ExelComponentInterface {
  toHtml(): string;

  init(): void;

  destroy(): void;
}

export interface ExelInterface {
  $el: Dom;
  components: ExelComponent[];

  render(): void;

  getRoot(): void;
}

export type ExelConstructorOptions = {
  components?: ExelComponentConstructor[]
};
