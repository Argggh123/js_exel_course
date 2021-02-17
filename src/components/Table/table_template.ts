const CODES = {
  A: 65,
  Z: 90,
};

function createCell(value: string): string {
  return `
    <div class="cell" contenteditable>${value}</div>
`;
}

function createCol(col: string = ''): string {
  return `
    <div class="column">${col}</div>
  `;
}

function createRow(content: string, numRow?: number): string {
  return `
    <div class="row">
      <div class="row-info">${numRow || ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index): string {
  return String.fromCharCode(CODES.A + index);
}

function createRowCell(colsCount: number): string {
  return new Array(colsCount)
    .fill('')
    .map(createCell)
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
      createRowCell(colsCount),
      counter + 1,
    ));
  }

  return rows.join('');
}
