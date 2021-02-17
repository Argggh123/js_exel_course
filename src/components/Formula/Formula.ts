import ExelComponent from '@core/ExelComponent/ExelComponent';
import { Dom } from '@core/Dom/Dom';

export default class Formula extends ExelComponent {
  static className = 'exel__formula';

  constructor($root: Dom) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHtml(): string {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput() {
  }

  onClick() {
  }
}
