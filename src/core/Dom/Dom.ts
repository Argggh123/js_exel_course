import { DomClassElement, DomInterface } from '@/utils/types';

export class Dom implements DomInterface {
  $el: HTMLElement;

  constructor(selector: string | HTMLElement) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
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

  append(node: DomClassElement) {
    let htmlNode: HTMLElement;

    if (node instanceof Dom) {
      htmlNode = node.$el;
    } else {
      htmlNode = node;
    }

    if (Element.prototype.append) {
      this.$el.append(htmlNode);
    } else {
      this.$el.appendChild(htmlNode);
    }

    return this;
  }

  on(eventType: string, callback: EventListener) {
    this.$el.addEventListener(eventType, callback);
  }

  removeEvent(eventType: string, callback: EventListener) {
    this.$el.removeEventListener(eventType, callback);
  }
}

export default function $(selector: string | HTMLElement): Dom {
  return new Dom(selector);
}

$.create = (tagName: string, classes: string = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
