import { CellObject, IDom } from '@core/Dom/types';

export function shouldResize(event: Event): boolean {
  return !!(<HTMLElement>event.target).dataset.resize;
}

export function isTableCell(event: Event): boolean {
  return (<HTMLElement>event.target).dataset.type === 'cell';
}

export function range(start: number, end: number): number[] {
  return new Array(
    start > end
      ? start - end + 1
      : end - start + 1,
  )
    .fill('')
    .map((_, index) => (
      start > end
        ? end + index
        : start + index
    ));
}

export function matrix(target: IDom, current: IDom): IDom[] {
  const targetId = target.getCellCords();
  const currentId = current.getCellCords();

  const cols = range(currentId.col, targetId.col);
  const rows = range(currentId.row, targetId.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => {
      acc.push(`${row}:${col}`);
    });

    return acc;
  }, []);
}

function getCellId(col: number, row: number): string {
  return `[data-id="${row}:${col}"]`;
}

export function selectDown({ col, row }: CellObject): string {
  return getCellId(col, row + 1);
}

export function selectUp({ col, row }: CellObject): string {
  return getCellId(col, row >= 1 ? row - 1 : 0);
}

export function selectRight({ col, row }: CellObject): string {
  return getCellId(col + 1, row);
}

export function selectLeft({ col, row }: CellObject): string {
  return getCellId(col >= 1 ? col - 1 : 0, row);
}
