import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngd-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NgdFooterComponent {}
