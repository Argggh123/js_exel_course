import Component from '@core/ExelComponent/Component';
import { IDom } from '@core/Dom/types';
import { ComponentConstructorOptions } from '@/components/Exel/types';
import $ from '@core/Dom/Dom';

export default class Formula extends Component {
  static className = 'exel__formula';

  private formula: IDom;

  constructor($root: IDom, options: ComponentConstructorOptions) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();

    this.formula = this.$root.find('#formula');

    this.$subscribe('cell:select', (cell: IDom) => {
      this.formula.fill(cell.getContent());
    });
    this.$subscribe('cell:input', (cell: IDom) => {
      this.formula.fill(cell.getContent());
    });
  }

  toHtml(): string {
    return `
      <div class="info">fx</div>
      <div class="input" id="formula" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event: InputEvent) {
    this.$dispatch(
      'formula:input',
      $((<HTMLElement>event.target)).getContent(),
    );
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.$dispatch('formula:done');
    }
  }
}
