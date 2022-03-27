import {
  CellObject, I$, IDom,
} from '@core/Dom/types';

export class Dom implements IDom {
  private readonly $el: HTMLElement;

  constructor(selector: string | HTMLElement) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  fill(text: string) {
    this.$el.textContent = text;
  }

  getContent(): string {
    if (this.$el.tagName.toLowerCase() === 'input') {
      return (<HTMLInputElement> this.$el).value.trim();
    }

    return this.$el.textContent.trim();
  }

  html(html?: string) {
    if (html) {
      this.$el.innerHTML = html;

      return this;
    }

    return this.$el.outerHTML.trim();
  }

  clear() {
    this.$el.innerHTML = '';

    return this;
  }

  focus(): this {
    this.$el.focus();

    return this;
  }

  getElement() {
    return this.$el;
  }

  append(node: IDom) {
    const htmlNode = node.getElement();

    if (Element.prototype.append) {
      this.$el.append(htmlNode);
    } else {
      this.$el.appendChild(htmlNode);
    }

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector: string) {
    return new Dom(this.$el.closest<HTMLElement>(selector));
  }

  getCords() {
    return this.$el.getBoundingClientRect();
  }

  on(eventType: string, callback: EventListener) {
    this.$el.addEventListener(eventType, callback);
  }

  removeEvent(eventType: string, callback: EventListener) {
    this.$el.removeEventListener(eventType, callback);
  }

  find(selector: string) {
    return new Dom(this.$el.querySelector<HTMLElement>(selector));
  }

  findAll(selector: string) {
    return this.$el.querySelectorAll<HTMLElement>(selector);
  }

  css(css: Partial<CSSStyleDeclaration> = {}) {
    Object.keys(css || {})
      .forEach((key) => {
        this.$el.style[key] = css[key];
      });
  }

  addClassNames(...classNames: string[]) {
    this.$el.classList.add(...classNames);
  }

  removeClassNames(...classNames: string[]) {
    this.$el.classList.remove(...classNames);
  }

  getCellCords(): CellObject {
    const cellIdCords = this.id().split(':');

    return {
      col: Number(cellIdCords[1]),
      row: Number(cellIdCords[0]),
    };
  }

  id(): string {
    return this.data.id;
  }
}

const $: I$ = (selector: string | HTMLElement) => new Dom(selector);

$.create = (tagName: string, classes: string = ''): IDom => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};

export default $;
