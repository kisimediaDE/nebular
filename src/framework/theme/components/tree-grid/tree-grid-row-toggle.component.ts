/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostListener, Input, inject } from '@angular/core';
import { NbTreeGridCellDirective } from './tree-grid-cell.component';
import { NbIconComponent } from '../icon/icon.component';

/**
 * NbTreeGridRowToggleComponent
 */
@Component({
  selector: 'nb-tree-grid-row-toggle',
  template: `
    <button class="row-toggle-button" [attr.aria-label]="expanded ? 'collapse' : 'expand'">
      <nb-icon
        [icon]="expanded ? 'chevron-down-outline' : 'chevron-right-outline'"
        pack="nebular-essentials"
        aria-hidden="true"
      >
      </nb-icon>
    </button>
  `,
  styles: [
    `
      button {
        background: transparent;
        border: none;
        padding: 0;
      }
    `,
  ],
  imports: [NbIconComponent],
})
export class NbTreeGridRowToggleComponent {
  private cell = inject(NbTreeGridCellDirective);

  private expandedValue: boolean;
  @Input()
  set expanded(value: boolean) {
    this.expandedValue = value;
  }
  get expanded(): boolean {
    return this.expandedValue;
  }

  @HostListener('click', ['$event'])
  toggleRow($event) {
    this.cell.toggleRow();
    $event.stopPropagation();
  }

  constructor() {}
}
