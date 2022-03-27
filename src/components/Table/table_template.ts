const CODES = {
  A: 65,
  Z: 90,
};

function createCell(row: number) {
  return (
    value: string,
    index: number,
  ): string => `<div class="cell" contenteditable data-col="${index}" data-type="cell" data-id="${row}:${index}">${value}</div>`;
}

function createCol(col: string = '', index: number): string {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content: string, numRow?: number): string {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${numRow || ''}
        ${numRow ? '<div class="row-resize" data-resize="row"></div>' : ''}
       </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index): string {
  return String.fromCharCode(CODES.A + index);
}

function createRowCell(colsCount: number, rowsCount: number): string {
  return new Array(colsCount)
    .fill(111)
    .map(createCell(rowsCount))
    .join('');
}

export default function createTable(rowsCount: number = 15): string {
  const colsCount: number = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('');

  rows.push(createRow(cols));

  for (let counter = 0; counter < rowsCount; counter += 1) {
    rows.push(createRow(
      createRowCell(colsCount, counter),
      counter + 1,
    ));
  }

  return rows.join('');
}
