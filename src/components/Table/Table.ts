import ExelComponent from '@core/ExelComponent/ExelComponent';
import createTable from '@/components/Table/table_template';
import { Dom } from '@core/Dom/Dom';
import resize from '@core/utils/resizer';
import { shouldResize } from '@core/utils/helpers';

export default class Table extends ExelComponent {
  static className = 'exel__table';

  constructor($root: Dom) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove'],
    });
  }

  toHtml(): string {
    return createTable();
  }

  onClick() {}

  onMousedown(event) {
    if (shouldResize(event)) {
      resize.apply(this, [event]);
    }
  }
}
