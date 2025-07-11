import { Component } from '@angular/core';
import { NbLayoutDirectionService, NbLayoutDirection } from '@kisimedia/nebular-theme';

@Component({
  selector: 'npg-layout-direction-toggle',
  styleUrls: ['./layout-direction-toggle.component.scss'],
  template: `
    <label dir="ltr">
      <input type="checkbox" value="isRtl" (click)="toggleFlow()" />
      <span>RTL</span>
    </label>
  `,
})
export class LayoutDirectionToggleComponent {
  constructor(private directionService: NbLayoutDirectionService) {}

  get isRtl() {
    return this.directionService.isRtl();
  }

  toggleFlow() {
    const oppositeDirection = this.isRtl ? NbLayoutDirection.LTR : NbLayoutDirection.RTL;
    this.directionService.setDirection(oppositeDirection);
  }
}
