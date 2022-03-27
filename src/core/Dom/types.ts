export type CellObject = { col: number; row: number };

export declare interface IDom {

  getContent(): string;

  fill(text: string): void;

  getElement(): HTMLElement;

  focus(): IDom;

  html(html?: string): string | IDom;

  append(node: IDom): IDom;

  id(): string;

  getCellCords(): CellObject;

  data: DOMStringMap;

  getCords(): DOMRect;

  on(eventType: string, callback: EventListener): void;

  removeEvent(eventType: string, callback: EventListener): void;

  find(selector: string): IDom;

  findAll(selector: string): NodeListOf<HTMLElement>;

  closest(selector: string): IDom;

  css(css: Partial<CSSStyleDeclaration>): void;

  addClassNames(...classNames: string[]): void;

  removeClassNames(...classNames: string[]): void;
}

export interface I$ {
  (selector: string | HTMLElement | EventTarget): IDom;

  create(tagName: string, classes: string): IDom
}
