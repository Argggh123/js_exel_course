import { DomListenerInterface, ExelComponentConstructorOptions } from '@/utils/types';
import { Dom } from '@core/Dom/Dom';
import { toCapitalize } from '@core/utils/trahsform';

export default class DomListener implements DomListenerInterface {
  $root: Dom;

  listeners: string[];

  private readonly name: string;

  constructor($root: Dom, options: ExelComponentConstructorOptions) {
    if (!$root) {
      throw new Error('No root property provided for DomListener');
    }

    this.$root = $root;
    this.listeners = options.listeners || [];
    this.name = options.name;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = `on${toCapitalize(listener)}`;
      if (!this[method]) {
        Error(`Method ${method} is not implemented on ${this.name || ''} Component`);

        return;
      }

      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = `on${toCapitalize(listener)}`;
      this.$root.removeEvent(listener, this[method]);
    });
  }
}
