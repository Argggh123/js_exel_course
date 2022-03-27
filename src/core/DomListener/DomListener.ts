import { toCapitalize } from '@core/utils/trahsform';
import { ComponentConstructorOptions } from '@/components/Exel/types';
import { IDom } from '@core/Dom/types';

export default class DomListener {
  constructor(
    protected readonly $root: IDom,
    protected readonly options: ComponentConstructorOptions,
  ) {
    this.prepare();
  }

  prepare() {}

  protected initDomListeners() {
    this.options.listeners?.forEach((listener) => {
      const method = `on${toCapitalize(listener)}`;
      if (!this[method]) {
        Error(`Method ${method} is not implemented on ${this.options.name || ''} Component`);

        return;
      }

      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  protected removeDomListeners() {
    this.options.listeners?.forEach((listener) => {
      const method = `on${toCapitalize(listener)}`;
      this.$root.removeEvent(listener, this[method]);
    });
  }
}
