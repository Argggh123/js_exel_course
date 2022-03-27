import Component from '@core/ExelComponent/Component';
import { IDom } from '@core/Dom/types';
import { ComponentConstructorOptions } from '@/components/Exel/types';

export default class Header extends Component {
  static className = 'exel__header';

  constructor($root: IDom, options: ComponentConstructorOptions) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }

  toHtml(): string {
    return `
      <input type="text" value="New Table" class="input" />
      <div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
      </div>
    `;
  }
}
