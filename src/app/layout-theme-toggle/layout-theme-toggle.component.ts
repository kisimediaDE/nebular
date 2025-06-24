import { Component, inject } from '@angular/core';
import { NbThemeService } from '@kisimedia/nebular-theme';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'npg-layout-theme-toggle',
  styleUrls: ['./layout-theme-toggle.component.scss'],
  template: `
    <div dir="ltr">
      <label *ngFor="let theme of themeList; index as i" class="theme-radio-label">
        <input
          type="radio"
          [value]="theme"
          name="theme"
          [attr.checked]="i === 0 || null"
          (change)="handleChange(theme)"
          class="theme-radio"
        />{{ theme | titlecase }}
      </label>
    </div>
  `,
  imports: [NgFor, TitleCasePipe],
})
export class LayoutThemeToggleComponent {
  private themeService = inject(NbThemeService);

  readonly themeList = ['default', 'dark', 'cosmic', 'corporate'];

  constructor() {}

  handleChange(theme: string): void {
    this.themeService.changeTheme(theme);
  }
}
