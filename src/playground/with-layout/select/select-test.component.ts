import { Component } from '@angular/core';
import { NbComponentSize } from '@kisimedia/nebular-theme';

@Component({
  template: `
    <h1>Empty select height test</h1>
    <nb-select *ngFor="let size of sizes" [size]="size"></nb-select>
  `,
  styles: [
    `
      nb-select {
        display: block;
      }
    `,
  ],
})
export class SelectTestComponent {
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];
}
