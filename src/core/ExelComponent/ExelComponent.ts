import DomListener from '@core/DomListener/DomListener';
import {
  ExelComponentConstructorOptions,
  ExelComponentInterface,
} from '@/utils/types';
import { Dom } from '@core/Dom/Dom';

export default class ExelComponent extends DomListener implements ExelComponentInterface {
  constructor($root: Dom, options: ExelComponentConstructorOptions) {
    super($root, options);
  }

  toHtml() {
    return '';
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}
