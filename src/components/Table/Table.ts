import ExelComponent from '@core/ExelComponent/ExelComponent';
import createTable from '@/components/Table/table_template';

export default class Table extends ExelComponent {
  static className = 'exel__table';

  toHtml(): string {
    return createTable();
  }
}
