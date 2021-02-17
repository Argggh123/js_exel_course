import ExelComponent from '@core/ExelComponent/ExelComponent';

export default class Header extends ExelComponent {
  static className = 'exel__header';

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
