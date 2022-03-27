import { IDom } from '@core/Dom/types';

export default class TableSelection {
  private static readonly selectedClassName = 'selected';

  current: IDom | null = null;

  constructor(private group: Array<IDom> = []) {
  }

  select($el: IDom) {
    this.clearGroup();
    $el
      .focus()
      .addClassNames(TableSelection.selectedClassName);

    this.current = $el;
    this.group.push($el);
  }

  clearGroup() {
    this.group.forEach((el) => el.removeClassNames(TableSelection.selectedClassName));
    this.group = [];
  }

  selectGroup(groupElem: IDom[] = []) {
    this.clearGroup();

    this.group = groupElem;
    this.group.forEach((el) => el.addClassNames(TableSelection.selectedClassName));
  }
}
