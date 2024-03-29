import Component from '@core/ExelComponent/Component';
import { Dom } from '@core/Dom/Dom';

export default class Toolbar extends Component {
  static className = 'exel__toolbar';

  constructor($root: Dom) {
    super($root, { name: 'Toolbar', listeners: ['click'] });
  }

  toHtml(): string {
    return `
      <div class="button">
        <i class="material-icons">format_align_left</i>
      </div>
      <div class="button">
        <i class="material-icons">format_align_center</i>
      </div>
      <div class="button">
        <i class="material-icons">format_align_right</i>
      </div>
      <div class="button">
        <i class="material-icons">format_bold</i>
      </div>
      <div class="button">
        <i class="material-icons">format_italic</i>
      </div>
      <div class="button">
        <i class="material-icons">format_underline</i>
      </div>
    `;
  }

  onClick() {
  }
}
