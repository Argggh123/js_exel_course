import Component from '@core/ExelComponent/Component';
import createTable from '@/components/Table/table_template';
import $, { Dom } from '@core/Dom/Dom';
import resize from '@core/utils/resizer';
import {
  isTableCell, matrix, selectDown, selectLeft, selectRight, selectUp, shouldResize,
} from '@core/utils/helpers';
import TableSelection from '@/components/Table/TableSelection';
import { IDom } from '@core/Dom/types';

export default class Table extends Component {
  static className = 'exel__table';

  selection = new TableSelection();

  constructor($root: Dom) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'mousemove', 'keydown', 'input'],
    });
  }

  toHtml(): string {
    return createTable();
  }

  prepare() {
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$subscribe('formula:input', (data: string) => {
      this.selection.current.fill(data);
    });

    this.$subscribe('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell(cell: IDom) {
    this.selection.select(cell);
    this.$dispatch('cell:select', cell);
  }

  onMousedown(event: PointerEvent) {
    if (shouldResize(event)) {
      resize.apply(this, [event]);
    }

    if (isTableCell(event)) {
      const target = $(event.target as HTMLElement);
      const { current } = this.selection;

      if (event.shiftKey) {
        const cellsId = matrix(target, current)
          .map((id) => this.$root.find(`[data-id="${id}"]`));

        this.selection.selectGroup(cellsId);

        return;
      }
      this.selection.select(target);
    }
  }

  onKeydown(event: KeyboardEvent) {
    const cellPosition = this.selection.current.getCellCords();

    switch (event.key) {
      case 'ArrowDown':
      case 'Enter':
        if (event.key === 'Enter' && event.shiftKey) {
          return;
        }
        event.preventDefault();
        this.selectCell(
          this.$root.find(selectDown(cellPosition)),
        );
        break;
      case 'Tab':
      case 'ArrowRight':
        event.preventDefault();
        this.selectCell(
          this.$root.find(selectRight(cellPosition)),
        );
        break;
      case 'ArrowUp':
        this.selectCell(
          this.$root.find(selectUp(cellPosition)),
        );
        break;
      case 'ArrowLeft':
        this.selectCell(
          this.$root.find(selectLeft(cellPosition)),
        );
        break;
      default:
        break;
    }
  }

  onInput(event: InputEvent) {
    this.$dispatch('cell:input', $(event.target));
  }
}
