import $, { Dom } from '@core/Dom/Dom';
import ExelComponent from '@core/ExelComponent/ExelComponent';
import { ExelConstructorOptions, ExelInterface } from '@/utils/types';

export default class Exel implements ExelInterface {
  $el: Dom;

  components: ExelComponent[];

  options: ExelConstructorOptions;

  constructor(selector: string, options: ExelConstructorOptions) {
    this.$el = $(selector);
    this.options = options;
  }

  getRoot() {
    const $root = $.create('div', 'exel');
    this.components = this.options.components?.map((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, { name: '' });
      $el.html(component.toHtml());
      $root.append($el);

      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((Component) => Component.init());
  }
}
