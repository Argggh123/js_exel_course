import $ from '@core/Dom/Dom';
import { ExelConstructorOptions, IExel } from '@/components/Exel/types';
import { IDom } from '@core/Dom/types';
import { IComponent } from '@core/ExelComponent/types';

export default class Exel implements IExel {
  private readonly $el: IDom;

  private components: IComponent[];

  constructor(selector: string, private readonly options: ExelConstructorOptions) {
    this.$el = $(selector);
  }

  private getRoot() {
    const $root = $.create('div', 'exel');

    this.components = this.options.components.map((Component) => {
      const $el = $.create('div', Component.className);

      const ExelComponent = new Component($el, {});
      $el.html(ExelComponent.toHtml());
      $root.append($el);

      return ExelComponent;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((Component) => Component.init());
  }
}
